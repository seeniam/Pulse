import { useEffect, useMemo, useState } from "react";
import { fetchTasks } from "./api/tasksApi";
import { DashboardSkeleton } from "./components/DashboardSkeleton";
import { ExecutiveInsight } from "./components/ExecutiveInsight";
import { SummaryCards } from "./components/SummaryCards";
import { TaskBoard } from "./components/TaskBoard";
import { TaskFilters } from "./components/TaskFilters";
import type { Task } from "./types/task";
import {
  applyQuickFilter,
  classifyTaskStatus,
  filterTasks,
  sortTasksForBoard,
  type TaskQuickFilter,
} from "./utils/taskStatus";

const LAST_SYNC_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatLastSync(lastSyncAt: Date | null) {
  if (!lastSyncAt) {
    return "Aguardando primeira sincronização";
  }

  const elapsedMs = Date.now() - lastSyncAt.getTime();

  if (elapsedMs < 60 * 1000) {
    return "Última sincronização: agora";
  }

  return `Última sincronização: ${LAST_SYNC_FORMATTER.format(lastSyncAt)}`;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [query, setQuery] = useState("");
  const [activeQuickFilter, setActiveQuickFilter] = useState<TaskQuickFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncAt, setLastSyncAt] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadTasks(mode: "initial" | "refresh" = "initial") {
    const isInitialLoad = mode === "initial";

    try {
      if (isInitialLoad) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }

      setErrorMessage("");

      const nextTasks = await fetchTasks();
      setTasks(nextTasks);
      setLastSyncAt(new Date());
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível conectar ao backend do Project Pulse.",
      );
    } finally {
      if (isInitialLoad) {
        setIsLoading(false);
      } else {
        setIsRefreshing(false);
      }
    }
  }

  useEffect(() => {
    void loadTasks("initial");
  }, []);

  const filteredTasks = useMemo(() => {
    const searchFilteredTasks = filterTasks(tasks, query);
    return applyQuickFilter(searchFilteredTasks, activeQuickFilter);
  }, [activeQuickFilter, query, tasks]);

  const { todoTasks, doingTasks, doneTasks, criticalTasks } = useMemo(() => {
    const groupedTasks = {
      todoTasks: [] as Task[],
      doingTasks: [] as Task[],
      doneTasks: [] as Task[],
      criticalTasks: 0,
    };

    for (const task of filteredTasks) {
      if (task.status_critico) {
        groupedTasks.criticalTasks += 1;
      }

      const boardStatus = classifyTaskStatus(task.status);

      if (boardStatus === "doing") {
        groupedTasks.doingTasks.push(task);
      } else if (boardStatus === "done") {
        groupedTasks.doneTasks.push(task);
      } else {
        groupedTasks.todoTasks.push(task);
      }
    }

    return {
      todoTasks: sortTasksForBoard(groupedTasks.todoTasks),
      doingTasks: sortTasksForBoard(groupedTasks.doingTasks),
      doneTasks: sortTasksForBoard(groupedTasks.doneTasks),
      criticalTasks: groupedTasks.criticalTasks,
    };
  }, [filteredTasks]);

  const isBusy = isLoading || isRefreshing;
  const syncMessage = isLoading
    ? "Sincronizando tarefas..."
    : isRefreshing
      ? "Atualizando dados do dashboard..."
      : "Atualizado com dados do backend";

  return (
    <main className="dashboard-shell">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">Executive Task Dashboard</p>
          <h1>Project Pulse</h1>
          <p className="subtitle">
            Painel executivo para acompanhar a saúde geral, as tarefas críticas,
            os gargalos em andamento e as entregas concluídas a partir do ClickUp.
          </p>
        </div>
        <div className="header-actions">
          <div className="header-status">
            <span className={`status-indicator ${isBusy ? "status-indicator--loading" : ""}`} />
            <span>{syncMessage}</span>
          </div>
          <button
            type="button"
            className="refresh-button"
            onClick={() => void loadTasks("refresh")}
            disabled={isBusy}
            aria-label={isRefreshing ? "Atualizando dados do dashboard" : "Atualizar dados do dashboard"}
          >
            {isRefreshing ? "Atualizando..." : "Atualizar dados"}
          </button>
          <p className="last-sync" aria-live="polite">
            {formatLastSync(lastSyncAt)}
          </p>
        </div>
      </section>

      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <SummaryCards
            totalTasks={filteredTasks.length}
            criticalTasks={criticalTasks}
            completedTasks={doneTasks.length}
          />

          <ExecutiveInsight
            totalTasks={filteredTasks.length}
            criticalTasks={criticalTasks}
            doingTasks={doingTasks.length}
            doneTasks={doneTasks.length}
          />

          <TaskFilters
            value={query}
            activeQuickFilter={activeQuickFilter}
            onChange={setQuery}
            onQuickFilterChange={setActiveQuickFilter}
          />
        </>
      )}

      {!isLoading && errorMessage ? (
        <section className="feedback-panel feedback-panel--error">
          <h2>Conexão indisponível</h2>
          <p>{errorMessage}</p>
        </section>
      ) : null}

      {!isLoading && !errorMessage ? (
        filteredTasks.length === 0 ? (
          <section className="feedback-panel">
            <h2>Nenhuma tarefa encontrada para este filtro.</h2>
            <p>Ajuste a busca textual ou troque o filtro rápido para continuar a análise.</p>
          </section>
        ) : (
          <TaskBoard todoTasks={todoTasks} doingTasks={doingTasks} doneTasks={doneTasks} />
        )
      ) : null}
    </main>
  );
}

export default App;

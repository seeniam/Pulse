import { useEffect, useMemo, useState } from "react";
import { fetchTasks } from "./api/tasksApi";
import { SummaryCards } from "./components/SummaryCards";
import { TaskBoard } from "./components/TaskBoard";
import { TaskFilters } from "./components/TaskFilters";
import type { Task } from "./types/task";
import { classifyTaskStatus, filterTasks } from "./utils/taskStatus";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTasks() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const nextTasks = await fetchTasks();

        if (isMounted) {
          setTasks(nextTasks);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Não foi possível conectar ao backend do Project Pulse.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredTasks = useMemo(() => filterTasks(tasks, query), [query, tasks]);

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

    return groupedTasks;
  }, [filteredTasks]);

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
        <div className="header-status">
          <span className={`status-indicator ${isLoading ? "status-indicator--loading" : ""}`} />
          <span>{isLoading ? "Sincronizando tarefas..." : "Atualizado com dados do backend"}</span>
        </div>
      </section>

      <SummaryCards
        totalTasks={filteredTasks.length}
        criticalTasks={criticalTasks}
        completedTasks={doneTasks.length}
      />

      <TaskFilters value={query} onChange={setQuery} />

      {isLoading ? (
        <section className="feedback-panel">
          <h2>Carregando dashboard</h2>
          <p>Buscando tarefas reais do ClickUp pelo backend do Project Pulse.</p>
        </section>
      ) : null}

      {!isLoading && errorMessage ? (
        <section className="feedback-panel feedback-panel--error">
          <h2>Conexão indisponível</h2>
          <p>{errorMessage}</p>
        </section>
      ) : null}

      {!isLoading && !errorMessage ? (
        filteredTasks.length === 0 ? (
          <section className="feedback-panel">
            <h2>Nenhuma tarefa encontrada</h2>
            <p>Ajuste o filtro para visualizar tarefas por nome ou responsável.</p>
          </section>
        ) : (
          <TaskBoard todoTasks={todoTasks} doingTasks={doingTasks} doneTasks={doneTasks} />
        )
      ) : null}
    </main>
  );
}

export default App;

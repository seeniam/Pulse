import type { Task } from "../types/task";

type TaskCardProps = {
  task: Task;
};

function formatDate(value: string | null) {
  if (!value) {
    return "Sem data";
  }

  const date = new Date(Number(value));

  if (Number.isNaN(date.getTime())) {
    return "Sem data";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatPriority(priority: string | null) {
  if (!priority) {
    return "Sem prioridade";
  }

  const normalizedPriority = priority.toLowerCase();

  if (normalizedPriority === "urgent") {
    return "Urgente";
  }

  return normalizedPriority.charAt(0).toUpperCase() + normalizedPriority.slice(1);
}

export function TaskCard({ task }: TaskCardProps) {
  const primaryAssignee = task.assignees[0]?.name ?? "Sem responsável";

  return (
    <article className={`task-card ${task.status_critico ? "task-card--critical" : ""}`}>
      <div className="task-card__header">
        <div>
          <h3>{task.name}</h3>
          <p>{task.status}</p>
        </div>
        {task.status_critico ? <span className="critical-badge">Crítica</span> : null}
      </div>

      <dl className="task-meta">
        <div>
          <dt>Prioridade</dt>
          <dd>{formatPriority(task.priority)}</dd>
        </div>
        <div>
          <dt>Responsável</dt>
          <dd>{primaryAssignee}</dd>
        </div>
        <div>
          <dt>Vencimento</dt>
          <dd>{formatDate(task.dueDate)}</dd>
        </div>
        <div>
          <dt>Última atualização</dt>
          <dd>{formatDate(task.dateUpdated)}</dd>
        </div>
      </dl>

      {task.url ? (
        <a className="task-link" href={task.url} target="_blank" rel="noreferrer">
          Abrir no ClickUp
        </a>
      ) : null}
    </article>
  );
}

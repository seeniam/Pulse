import { TaskCard } from "./TaskCard";
import type { Task } from "../types/task";

type TaskColumnProps = {
  title: string;
  count: number;
  tasks: Task[];
};

export function TaskColumn({ title, count, tasks }: TaskColumnProps) {
  const columnTone = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <section className={`board-column board-column--${columnTone}`} aria-label={title}>
      <header className="board-column__header">
        <h2>{title}</h2>
        <span className="column-count">{count}</span>
      </header>

      <div className="board-column__content">
        {tasks.length === 0 ? (
          <div className="empty-column">Nenhuma tarefa nesta coluna.</div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </section>
  );
}

import { TaskCard } from "./TaskCard";
import type { Task } from "../types/task";

type TaskColumnProps = {
  title: string;
  count: number;
  tasks: Task[];
};

export function TaskColumn({ title, count, tasks }: TaskColumnProps) {
  return (
    <section className="board-column" aria-label={title}>
      <header className="board-column__header">
        <h2>{title}</h2>
        <span>{count}</span>
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

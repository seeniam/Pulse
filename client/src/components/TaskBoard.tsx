import { TaskColumn } from "./TaskColumn";
import type { Task } from "../types/task";

type TaskBoardProps = {
  todoTasks: Task[];
  doingTasks: Task[];
  doneTasks: Task[];
};

export function TaskBoard({ todoTasks, doingTasks, doneTasks }: TaskBoardProps) {
  return (
    <section className="task-board" aria-label="Board executivo de tarefas">
      <TaskColumn title="To Do" count={todoTasks.length} tasks={todoTasks} />
      <TaskColumn title="Doing" count={doingTasks.length} tasks={doingTasks} />
      <TaskColumn title="Done" count={doneTasks.length} tasks={doneTasks} />
    </section>
  );
}

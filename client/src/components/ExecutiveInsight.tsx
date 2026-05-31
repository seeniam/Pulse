type ExecutiveInsightProps = {
  totalTasks: number;
  criticalTasks: number;
  doingTasks: number;
  doneTasks: number;
};

function getInsightMessage({
  totalTasks,
  criticalTasks,
  doingTasks,
  doneTasks,
}: ExecutiveInsightProps) {
  if (totalTasks === 0) {
    return "Nenhuma tarefa corresponde aos filtros atuais.";
  }

  if (criticalTasks > 0) {
    return `Atenção: há ${criticalTasks} tarefa${criticalTasks > 1 ? "s críticas" : " crítica"} que exige${criticalTasks > 1 ? "m" : ""} acompanhamento.`;
  }

  if (doingTasks >= 2) {
    return `Há ${doingTasks} tarefas em andamento; acompanhe possíveis gargalos.`;
  }

  if (doneTasks > 0) {
    return `Operação estável: ${doneTasks} entrega${doneTasks > 1 ? "s concluídas" : " concluída"} dentro dos filtros atuais.`;
  }

  return "Operação estável: nenhuma tarefa crítica nos critérios atuais.";
}

export function ExecutiveInsight(props: ExecutiveInsightProps) {
  return (
    <section className="executive-insight" aria-label="Insight executivo">
      <p>{getInsightMessage(props)}</p>
    </section>
  );
}

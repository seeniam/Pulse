type ExecutiveInsightProps = {
  totalTasks: number;
  criticalTasks: number;
  doingTasks: number;
  doneTasks: number;
};

function getInsight({
  totalTasks,
  criticalTasks,
  doingTasks,
  doneTasks,
}: ExecutiveInsightProps) {
  if (totalTasks === 0) {
    return {
      tone: "neutral",
      marker: "0",
      title: "Sem tarefas no recorte",
      message: "Nenhuma tarefa corresponde aos filtros atuais.",
    };
  }

  if (criticalTasks > 0) {
    return {
      tone: "critical",
      marker: "!",
      title: "Atenção executiva",
      message: `${criticalTasks} tarefa${criticalTasks > 1 ? "s críticas exigem" : " crítica exige"} acompanhamento imediato.`,
    };
  }

  if (doingTasks >= 2) {
    return {
      tone: "progress",
      marker: "FLOW",
      title: "Fluxo em andamento",
      message: `Há ${doingTasks} tarefas em andamento; acompanhe possíveis gargalos.`,
    };
  }

  if (doneTasks > 0) {
    return {
      tone: "success",
      marker: "OK",
      title: "Operação estável",
      message: `${doneTasks} entrega${doneTasks > 1 ? "s concluídas" : " concluída"} dentro dos filtros atuais.`,
    };
  }

  return {
    tone: "success",
    marker: "OK",
    title: "Operação estável",
    message: "Nenhuma tarefa crítica nos critérios atuais.",
  };
}

export function ExecutiveInsight(props: ExecutiveInsightProps) {
  const insight = getInsight(props);

  return (
    <section
      className={`executive-insight executive-insight--${insight.tone}`}
      aria-label="Insight executivo"
    >
      <span className="executive-insight__icon" aria-hidden="true">
        {insight.marker}
      </span>
      <div>
        <p className="executive-insight__title">{insight.title}</p>
        <p>{insight.message}</p>
      </div>
    </section>
  );
}

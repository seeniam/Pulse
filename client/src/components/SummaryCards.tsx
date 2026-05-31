type SummaryCardsProps = {
  totalTasks: number;
  criticalTasks: number;
  doingTasks: number;
  completedTasks: number;
};

export function SummaryCards({
  totalTasks,
  criticalTasks,
  doingTasks,
  completedTasks,
}: SummaryCardsProps) {
  const cards = [
    {
      label: "Total de tarefas",
      value: totalTasks,
      icon: "ALL",
      tone: "default",
    },
    {
      label: "Tarefas críticas",
      value: criticalTasks,
      icon: "RISK",
      tone: "critical",
    },
    {
      label: "Em andamento",
      value: doingTasks,
      icon: "FLOW",
      tone: "progress",
    },
    {
      label: "Concluídas",
      value: completedTasks,
      icon: "DONE",
      tone: "success",
    },
  ];

  return (
    <section className="summary-grid" aria-label="Resumo executivo">
      {cards.map((card) => (
        <article key={card.label} className={`summary-card summary-card--${card.tone}`}>
          <div className="summary-card__header">
            <p>{card.label}</p>
            <span className="summary-card__icon" aria-hidden="true">
              {card.icon}
            </span>
          </div>
          <strong>{card.value}</strong>
        </article>
      ))}
    </section>
  );
}

type SummaryCardsProps = {
  totalTasks: number;
  criticalTasks: number;
  completedTasks: number;
};

export function SummaryCards({
  totalTasks,
  criticalTasks,
  completedTasks,
}: SummaryCardsProps) {
  const cards = [
    {
      label: "Total de tarefas",
      value: totalTasks,
      tone: "default",
    },
    {
      label: "Tarefas criticas",
      value: criticalTasks,
      tone: "critical",
    },
    {
      label: "Concluidas",
      value: completedTasks,
      tone: "success",
    },
  ];

  return (
    <section className="summary-grid" aria-label="Resumo executivo">
      {cards.map((card) => (
        <article key={card.label} className={`summary-card summary-card--${card.tone}`}>
          <p>{card.label}</p>
          <strong>{card.value}</strong>
        </article>
      ))}
    </section>
  );
}

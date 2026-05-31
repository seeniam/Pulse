export function DashboardSkeleton() {
  return (
    <section className="dashboard-skeleton" aria-label="Carregando dashboard" aria-busy="true">
      <div className="summary-grid">
        {Array.from({ length: 3 }).map((_, index) => (
          <article key={`summary-${index}`} className="summary-card skeleton-card">
            <div className="skeleton-block skeleton-block--label" />
            <div className="skeleton-block skeleton-block--value" />
          </article>
        ))}
      </div>

      <div className="filters-bar">
        <div className="quick-filters">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={`filter-${index}`} className="skeleton-chip" />
          ))}
        </div>
        <div className="search-field">
          <div className="skeleton-block skeleton-block--label" />
          <div className="skeleton-input" />
        </div>
      </div>

      <section className="task-board" aria-hidden="true">
        {Array.from({ length: 3 }).map((_, columnIndex) => (
          <section key={`column-${columnIndex}`} className="board-column">
            <header className="board-column__header">
              <div className="skeleton-block skeleton-block--column-title" />
              <div className="skeleton-counter" />
            </header>

            <div className="board-column__content">
              {Array.from({ length: 2 }).map((_, cardIndex) => (
                <article key={`card-${columnIndex}-${cardIndex}`} className="task-card skeleton-card">
                  <div className="skeleton-block skeleton-block--card-title" />
                  <div className="skeleton-block skeleton-block--card-subtitle" />
                  <div className="task-meta">
                    {Array.from({ length: 4 }).map((__, metaIndex) => (
                      <div key={`meta-${columnIndex}-${cardIndex}-${metaIndex}`}>
                        <div className="skeleton-block skeleton-block--meta-label" />
                        <div className="skeleton-block skeleton-block--meta-value" />
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </section>
    </section>
  );
}

import type { TaskQuickFilter } from "../utils/taskStatus";

const QUICK_FILTER_OPTIONS: Array<{ label: string; value: TaskQuickFilter }> = [
  { label: "Todos", value: "all" },
  { label: "Críticas", value: "critical" },
  { label: "Sem responsável", value: "unassigned" },
  { label: "Em andamento", value: "doing" },
  { label: "Concluídas", value: "done" },
];

type TaskFiltersProps = {
  value: string;
  activeQuickFilter: TaskQuickFilter;
  onChange: (value: string) => void;
  onQuickFilterChange: (value: TaskQuickFilter) => void;
};

export function TaskFilters({
  value,
  activeQuickFilter,
  onChange,
  onQuickFilterChange,
}: TaskFiltersProps) {
  return (
    <section className="filters-bar" aria-label="Filtros de tarefas">
      <div className="quick-filters" role="group" aria-label="Filtros rápidos">
        {QUICK_FILTER_OPTIONS.map((filterOption) => (
          <button
            key={filterOption.value}
            type="button"
            className={`quick-filter ${activeQuickFilter === filterOption.value ? "quick-filter--active" : ""}`}
            onClick={() => onQuickFilterChange(filterOption.value)}
            aria-pressed={activeQuickFilter === filterOption.value}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      <label className="search-field">
        <span>Buscar por tarefa ou responsável</span>
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ex.: cobrança, Neemias, contratos"
        />
      </label>
    </section>
  );
}

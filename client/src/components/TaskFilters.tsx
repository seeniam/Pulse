type TaskFiltersProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TaskFilters({ value, onChange }: TaskFiltersProps) {
  return (
    <section className="filters-bar" aria-label="Filtros de tarefas">
      <label className="search-field">
        <span>Buscar por tarefa ou responsavel</span>
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ex.: cobranca, Neemias, contratos"
        />
      </label>
    </section>
  );
}

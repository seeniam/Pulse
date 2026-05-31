function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Executive Task Dashboard</p>
        <h1>Project Pulse</h1>
        <p className="subtitle">
          Dashboard executivo de tarefas para consolidar saude operacional,
          prioridades e andamento da execucao.
        </p>
        <div className="status-card" aria-live="polite">
          <span className="status-dot" />
          <span>Frontend base pronto para receber integracao com o backend.</span>
        </div>
      </section>
    </main>
  );
}

export default App;


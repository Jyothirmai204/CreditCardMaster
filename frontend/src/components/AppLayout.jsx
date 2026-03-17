import MetricCard from "./MetricCard";
import Toast from "./Toast";

export default function AppLayout({
  auth,
  currentPage,
  navPages,
  openPage,
  onLogout,
  toast,
  children
}) {
  const pageTitle = currentPage?.label || "Overview";

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="brand-chip">CardMaster</div>
          <h1>Control Room</h1>
          <p className="muted">Frontend routed module by module across your Spring Boot domains.</p>
        </div>

        <nav className="nav-stack">
          {navPages.map((page) => (
            <button
              key={page.path}
              className={page.path === currentPage.path ? "nav-link active" : "nav-link"}
              onClick={() => openPage(page.path)}
            >
              {page.label}
            </button>
          ))}
        </nav>

        <div className="role-card">
          <span className="eyebrow">Signed In As</span>
          <strong>{auth.name || "Operator"}</strong>
          <span>{auth.role}</span>
        </div>
      </aside>

      <main className="main-panel">
        <header className="hero">
          <div>
            <span className="eyebrow">{currentPage.eyebrow}</span>
            <h2>{currentPage.title}</h2>
            <p>{currentPage.description}</p>
          </div>
          <button className="ghost-button" onClick={onLogout}>
            Logout
          </button>
        </header>

        <Toast message={toast} />

        <section className="metrics-grid">
          <MetricCard label="Current Page" value={pageTitle} detail={currentPage.path} />
          <MetricCard label="Role Access" value={`${navPages.length} pages`} detail={auth.role} />
          <MetricCard label="Routing Mode" value="History API" detail="Direct URLs with back/forward support" />
        </section>

        {children}
      </main>
    </div>
  );
}

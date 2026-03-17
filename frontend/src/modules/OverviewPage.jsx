import { MODULE_CARDS, PAGES, ROLE_NAV } from "../config";

export default function OverviewPage({ auth, navigate }) {
  const nav = ROLE_NAV[auth.role] || ROLE_NAV.ADMIN;

  function getPageLabel(path) {
    const page = PAGES.find((item) => item.path === path);
    return page ? page.label : path;
  }

  return (
    <section className="content-grid">
      <section className="wide-panel">
        <div className="panel">
          <span className="eyebrow">Product Map</span>
          <h3>Backend-backed website layout</h3>
          <div className="module-grid">
            {MODULE_CARDS.map((module) => (
              <article key={module.id} className="module-card module-card-action" onClick={() => navigate(module.path)}>
                <span>{module.id}</span>
                <h4>{module.title}</h4>
                <p>{module.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="side-column">
        <div className="panel">
          <span className="eyebrow">Role Matrix</span>
          <h3>Current navigation for {auth.role}</h3>
          <ul className="plain-list">
            {nav.map((item) => (
              <li key={item}>{getPageLabel(item)}</li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <span className="eyebrow">Execution Flow</span>
          <ol className="plain-list ordered">
            <li>Register or log in and store the JWT.</li>
            <li>Create customer, application, and document.</li>
            <li>Generate score and underwriting decision.</li>
            <li>Issue card and create linked card account.</li>
            <li>Authorize or post transactions and then bill them.</li>
          </ol>
        </div>
      </section>
    </section>
  );
}

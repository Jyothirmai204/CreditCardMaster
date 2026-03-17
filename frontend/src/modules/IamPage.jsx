export default function IamPage({ auth }) {
  return (
    <section className="content-grid single-main">
      <section className="wide-panel">
        <div className="panel">
          <span className="eyebrow">IAM Session</span>
          <h3>Authenticated operator</h3>
          <p className="session-copy">
            The dashboard uses the JWT returned by `/users/login` and filters routes against the active role.
          </p>
          <div className="session-grid">
            <div className="session-tile">
              <span>Name</span>
              <strong>{auth.name}</strong>
            </div>
            <div className="session-tile">
              <span>Role</span>
              <strong>{auth.role}</strong>
            </div>
          </div>
          <div className="token-box">{auth.token}</div>
        </div>
      </section>
    </section>
  );
}

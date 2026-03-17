import { useState } from "react";
import { apiRequest } from "../lib/api";
import { decodeJwtPayload } from "../lib/auth";
import { FormGrid, Input } from "./FormControls";
import Toast from "./Toast";

export default function AuthScreen({ onLogin, toast }) {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState({ email: "admin@example.com", password: "Admin123" });

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await apiRequest("/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: login.email,
          password: login.password
        })
      });

      const token = response?.data || "";
      const payload = decodeJwtPayload(token);
      onLogin({
        token,
        role: payload.role || "ADMIN",
        name: payload.sub || login.email
      });
    } catch (error) {
      onLogin(null, error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-shell">
      <section className="auth-panel-wrap">
        <Toast message={toast} />
        <div className="auth-card auth-card-compact">
          <div className="brand-chip dark auth-brand">CardMaster</div>
          <span className="eyebrow">Secure Access</span>
          <h2>Login</h2>
          <p>Sign in with email and password to access the dashboard.</p>
          <FormGrid onSubmit={handleLogin}>
            <Input
              label="Email"
              value={login.email}
              onChange={(value) => setLogin({ ...login, email: value })}
            />
            <Input
              label="Password"
              type="password"
              value={login.password}
              onChange={(value) => setLogin({ ...login, password: value })}
            />
            <button className="primary-button" disabled={loading}>
              {loading ? "Signing In..." : "Login"}
            </button>
          </FormGrid>
        </div>
      </section>
    </div>
  );
}

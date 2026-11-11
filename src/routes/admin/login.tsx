import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { api, ApiError } from "@/lib/blog";
import { adminHead } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: adminHead("Sign in"),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      await api("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      navigate({ to: "/admin", replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not reach the server");
    } finally { setBusy(false); }
  };

  return <div className="adm adm-login">
    <form onSubmit={submit} className="adm-login-card">
      <p className="adm-brand">Umbreen <span>Journal CMS</span></p>
      <h1>Sign in</h1>
      <label>Email<input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      {error && <p className="adm-error" role="alert">{error}</p>}
      <button className="adm-btn adm-btn--primary" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  </div>;
}

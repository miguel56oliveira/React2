import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro desconhecido.");
        return;
      }

      // Garantir que o user.id esteja presente
      const user = {
        id: data.user.id,      // ou data.user.user_id dependendo do backend
        nome: data.user.nome,
        email: data.user.email
      };

      // Salvar token e user no localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/"); // redirecionar para homepage
    } catch (err) {
      console.error(err);
      setError("Erro ao ligar ao servidor.");
    }
  }

  return (
    <div className="login-container">
      <h1>Entrar</h1>

      <form onSubmit={handleLogin} className="login-form">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label>Palavra-passe</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="login-btn">Entrar</button>
      </form>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Não tens conta?{" "}
        <Link to="/register" style={{ color: "#1e90ff", textDecoration: "underline" }}>
          Criar Conta
        </Link>
      </p>
    </div>
  );
}

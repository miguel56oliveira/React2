import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

export default function Register() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validação mínima da password
    if (password.length < 6) {
      setError("A palavra-passe deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro desconhecido.");
        setLoading(false);
        return;
      }

      setSuccess("Conta criada com sucesso! Agora podes fazer login.");
      setLoading(false);

      // Redirecionar automaticamente após 2 segundos
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      console.error(err);
      setError("Erro ao ligar ao servidor.");
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <h1>Criar Conta</h1>

      <form onSubmit={handleRegister} className="login-form">
        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />

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
        {success && <p className="success">{success}</p>}

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "A criar..." : "Criar Conta"}
        </button>
      </form>

      {/* Link para login */}
      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Já tens conta?{" "}
        <Link to="/login" style={{ color: "#1e90ff", textDecoration: "underline" }}>
          Entrar
        </Link>
      </p>
    </div>
  );
}

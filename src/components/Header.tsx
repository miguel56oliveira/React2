import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/pesquisa/${search}`);
      setSearch("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  // Contar itens do carrinho
  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:3001/api/cart/${user.id}`)
        .then(res => res.json())
        .then(data => setCartCount(data.length))
        .catch(err => console.error("Erro ao obter carrinho:", err));
    }
  }, [user]);

  const goToCart = () => {
    if (!user?.id) {
      alert("Precisas de estar logado para ver o carrinho.");
      return;
    }
    navigate("/carrinho");
  };

  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "15px 30px",
      background: "#1e1e1e",
      color: "white",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ fontWeight: "bold", fontSize: "24px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          GamesStore
        </Link>
      </div>

      <div style={{ flex: 1, margin: "0 20px" }}>
        <input
          type="text"
          placeholder="Pesquisar jogos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
          style={{
            width: "95%",
            padding: "8px 12px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {user ? (
          <>
            <span>Olá, {user.nome}</span>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "1px solid white",
                borderRadius: "5px",
                padding: "8px 12px",
                color: "white",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              background: "transparent",
              border: "1px solid white",
              borderRadius: "5px",
              padding: "8px 12px",
              color: "white",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            Login
          </Link>
        )}

        <button
          onClick={goToCart}
          style={{
            position: "relative",
            background: "transparent",
            border: "1px solid white",
            borderRadius: "5px",
            padding: "8px 12px",
            color: "white",
            cursor: "pointer"
          }}
        >
          Carrinho
          {cartCount > 0 && (
            <span style={{
              position: "absolute",
              top: "-5px",
              right: "-10px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px"
            }}>
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

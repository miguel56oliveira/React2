import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoriesMenu from "../components/CategoriesMenu";
import { fetchGames } from "../services/gamesService";

export default function Games() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchGames(selectedCategory)
      .then(setGames)
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const handleAddToCart = async (gameId: number, gameName: string) => {
      console.log("Usuário no localStorage:", localStorage.getItem("user")); 
    
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user?.id) {
      alert("Precisas de estar logado para adicionar ao carrinho.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: Number(user.id), gameId: Number(gameId) })
      });

      const data = await response.json();
      console.log("Resposta do backend:", data);

      if (!response.ok) {
        alert(data.error || "Erro ao adicionar ao carrinho.");
        return;
      }

      alert(`${gameName} adicionado ao carrinho!`);
    } catch (err) {
      console.error("Erro ao ligar ao servidor:", err);
      alert("Erro ao ligar ao servidor.");
    }
  };

  if (loading) return <p>Carregando jogos..</p>;

  return (
    <div className="container">
      <h1>Lista de Videojogos</h1>
      <CategoriesMenu onSelect={setSelectedCategory} />

      {selectedCategory && (
        <p style={{ marginBottom: "10px" }}>
          Categoria selecionada: <strong>{selectedCategory}</strong>
        </p>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {games.map(game => (
          <div key={game.id} className="card">
            <Link to={`/jogo/${game.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img src={game.imagem} alt={game.nome} />
              <h3>{game.nome}</h3>
              <p>{game.plataforma}</p>
            </Link>

            <div className="card-buttons">
              <button 
                className="buy-btn"
                onClick={() => handleAddToCart(game.id, game.nome)}
              >
                COMPRAR
              </button>
              <button
                className="price-btn"
                disabled
                aria-disabled="true"
                tabIndex={-1}
              >
                {game.preco}€
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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

  if (loading) return <p>Carregando jogos...</p>;

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
          <Link 
            key={game.id} 
            to={`/jogo/${game.id}`} 
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card">
              <img src={game.imagem} alt={game.nome} />
              <h3>{game.nome}</h3>
              <p>{game.plataforma}</p>
              <div className="card-buttons">
                <button 
                  className="buy-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`${game.nome} adicionado ao carrinho!`);
                  }}
                >
                  COMPRAR
                </button>
                <button
                  className="price-btn"
                  disabled
                  aria-disabled="true"
                  tabIndex={-1}
                  onClick={(e) => e.preventDefault()}
                >
                  {game.preco}€
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

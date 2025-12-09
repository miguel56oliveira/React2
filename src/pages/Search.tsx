import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchGames } from "../services/gamesService";

export default function Search() {
  const { texto } = useParams<{ texto: string }>();
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchGames()
      .then(setGames)
      .finally(() => setLoading(false));
  }, [texto]); // 🔥 re-carrega ao mudar a pesquisa

  if (loading) return <p>Carregando resultados...</p>;

  const resultados = games.filter((game) =>
    game.nome.toLowerCase().includes((texto ?? "").toLowerCase())
  );

  return (
    <div className="container">
      <h1>Resultados para: "{texto}"</h1>

      {resultados.length === 0 && (
        <p>Nenhum jogo encontrado.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {resultados.map((game) => (
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

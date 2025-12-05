import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  }, []);

  if (loading) return <p>Carregando resultados...</p>;

  const resultados = games.filter(game =>
    game.nome.toLowerCase().includes(String(texto).toLowerCase())
  );

  return (
    <div className="container">
      <h1>Resultados para: "{texto}"</h1>

      {resultados.length > 0 ? (
        resultados.map(game => (
          <p key={game.id}>{game.nome}</p>
        ))
      ) : (
        <p>Nenhum jogo encontrado.</p>
      )}
    </div>
  );
}

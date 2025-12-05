import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGameById } from "../services/gamesService";

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchGameById(Number(id))
      .then(setGame)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando jogo...</p>;
  if (!game) return <p>Jogo não encontrado.</p>;

  return (
    <div className="container">
      <h1>{game.nome}</h1>
      <img src={game.imagem} alt={game.nome} style={{ width: "300px", borderRadius: "10px" }} />
      <p>Plataforma: {game.plataforma}</p>
      <p style={{ fontWeight: "bold", color: "#27ae60" }}>Preço: {game.preco}€</p>
      <button onClick={() => navigate(-1)}>⬅ Voltar</button>
    </div>
  );
}

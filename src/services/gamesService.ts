// services/gamesService.ts
export async function fetchGames(plataforma?: string) {
  let url = "http://localhost:3001/api/games";
  if (plataforma) url += `?plataforma=${encodeURIComponent(plataforma)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar jogos");
  const data = await res.json();
  return data;
}

export async function fetchGameById(id: number) {
  const res = await fetch(`http://localhost:3001/api/games/${id}`);
  if (!res.ok) throw new Error("Jogo não encontrado");
  const data = await res.json();
  return data;
}

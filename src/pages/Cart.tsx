import { useEffect, useState } from "react";

interface CartItem {
  id: number;       // id do registro na tabela cart
  game_id: number;  // id do jogo
  nome: string;
  preco: number;
  imagem: string;
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:3001/api/cart/${user.id}`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error("Erro ao obter carrinho:", err));
  }, [user]);

  const removeItem = async (gameId: number) => {
    if (!user?.id) return;

    try {
      const response = await fetch("http://localhost:3001/api/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, gameId })
      });

      if (!response.ok) {
        console.error("Erro ao remover item:", await response.text());
        return;
      }

      setItems(prev => prev.filter(item => item.game_id !== gameId));
    } catch (err) {
      console.error("Erro ao remover item:", err);
    }
  };

  if (!user?.id) return <p>Precisas de estar logado para ver o carrinho.</p>;

  return (
    <div className="container">
      <h1>Meu Carrinho</h1>
      {items.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {items.map(item => (
            <div key={item.game_id} className="card">
              <img src={item.imagem} alt={item.nome} />
              <h3>{item.nome}</h3>
              <p>{item.preco}€</p>
              <button onClick={() => removeItem(item.game_id)}>Remover</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

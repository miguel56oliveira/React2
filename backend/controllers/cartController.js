const db = require("../db");

// Obter carrinho
async function getCart(req, res) {
  const { userId } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT c.id, g.id AS game_id, g.nome, g.preco, g.imagem FROM cart c JOIN games g ON c.game_id = g.id WHERE c.user_id = ?",
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Erro ao obter carrinho:", err.sqlMessage || err);
    res.status(500).json({ error: "Erro ao obter carrinho." });
  }
}

// Adicionar ao carrinho
async function addToCart(req, res) {
  const { userId, gameId } = req.body;

  // Log para debug
  console.log("Recebido no backend:", { userId, gameId, tipoUser: typeof userId, tipoGame: typeof gameId });

  try {
    // Garantir que os IDs são números
    const [result] = await db.query(
      "INSERT INTO cart (user_id, game_id) VALUES (?, ?)",
      [parseInt(userId), parseInt(gameId)]
    );

    console.log("Resultado do insert:", result);
    res.json({ message: "Jogo adicionado ao carrinho." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao adicionar ao carrinho." });
  }
}

// Remover do carrinho
async function removeFromCart(req, res) {
  const { userId, gameId } = req.body;

  if (!userId || !gameId) {
    return res.status(400).json({ error: "userId e gameId são obrigatórios." });
  }

  try {
    const [result] = await db.query(
      "DELETE FROM cart WHERE user_id = ? AND game_id = ?",
      [userId, gameId]
    );
    console.log("Removido do carrinho:", result);
    res.json({ message: "Jogo removido do carrinho." });
  } catch (err) {
    console.error("Erro ao remover do carrinho:", err.sqlMessage || err);
    res.status(500).json({ error: err.sqlMessage || "Erro ao remover do carrinho." });
  }
}

module.exports = { getCart, addToCart, removeFromCart };

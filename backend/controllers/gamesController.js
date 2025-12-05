const db = require("../db");

// Listar todos os jogos (opcional filtro por plataforma)
exports.getGames = async (req, res) => {
  const { plataforma } = req.query;
  try {
    let query = "SELECT * FROM games";
    const params = [];
    if (plataforma) {
      query += " WHERE plataforma = ?";
      params.push(plataforma);
    }
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Pegar um jogo específico
exports.getGameById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM games WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Jogo não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Criar um novo jogo
exports.createGame = async (req, res) => {
  const { title, plataforma, release_year } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO games (title, plataforma, release_year) VALUES (?, ?, ?)",
      [title, plataforma, release_year]
    );
    res.status(201).json({ id: result.insertId, title, plataforma, release_year });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar um jogo existente
exports.updateGame = async (req, res) => {
  const { id } = req.params;
  const { title, plataforma, release_year } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE games SET title = ?, plataforma = ?, release_year = ? WHERE id = ?",
      [title, plataforma, release_year, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Jogo não encontrado" });
    res.json({ id, title, plataforma, release_year });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deletar um jogo
exports.deleteGame = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM games WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Jogo não encontrado" });
    res.json({ message: "Jogo deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


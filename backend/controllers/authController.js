const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db"); // ligação ao MySQL

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: "Utilizador não encontrado." });
    }

    const user = rows[0];

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Password incorreta." });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      "SEGREDO_SUPER_SEGURO",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login efetuado",
      token,
      user: { id: user.id, nome: user.nome, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor." });
  }
}

async function register(req, res) {
  const { nome, email, password } = req.body;

  try {
    // Verificar se email já existe
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(400).json({ error: "Email já registado." });
    }

    // Criar hash da password
    const password_hash = await bcrypt.hash(password, 10);

    // Inserir utilizador na BD
    await db.query(
      "INSERT INTO users (nome, email, password_hash, role) VALUES (?, ?, ?, 'user')",
      [nome, email, password_hash]
    );

    res.json({ message: "Conta criada com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor." });
  }
}

module.exports = { login, register };

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const gamesRoutes = require("./routes/games");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173" // porta do React
}));
app.use(express.json());

// Rotas
app.use("/api/games", gamesRoutes);
app.use("/api", authRoutes);
app.use("/api/cart", cartRoutes);

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const gamesRoutes = require("./routes/games");

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/games", gamesRoutes);

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});

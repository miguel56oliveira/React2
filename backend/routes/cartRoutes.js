const express = require("express");
const { getCart, addToCart, removeFromCart } = require("../controllers/cartController");
const router = express.Router();

// Obter carrinho do utilizador
router.get("/:userId", getCart);

// Adicionar jogo ao carrinho
router.post("/add", addToCart);

// Remover jogo do carrinho
router.delete("/remove", removeFromCart);

module.exports = router;

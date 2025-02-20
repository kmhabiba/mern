const express = require("express");
const router = express.Router();
const { getCart, addToCart, removeFromCart } = require("../controllers/cartController");
const { protect } = require("../middlewares/authMiddleware");
 
// Define routes with authentication middleware
router.get("/", getCart);
router.post("/add", addToCart);
router.post("/remove", removeFromCart);
 
module.exports = router;
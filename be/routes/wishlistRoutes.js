const express = require("express");
const router = express.Router();
const { getWishlist, toggleWishlist } = require("../controllers/wishlistController");
const { protect } = require("../middlewares/authMiddleware");
 
// Ensure protect and controller functions are valid
if (typeof protect !== "function") {
    throw new Error("protect must be a function in authMiddleware");
}
 
if (typeof getWishlist !== "function" || typeof toggleWishlist !== "function") {
    throw new Error("One or more controller functions are missing or not properly exported");
}
 
// Define routes with authentication middleware
router.get("/", protect, getWishlist);
router.post("/toggle", protect, toggleWishlist); // Updating route
 
module.exports = router;
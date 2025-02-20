const Cart = require("../Models/Cart");
const Product = require("../Models/Product");
 
// Get the cart for a specific user
exports.getCart = async (req, res) => {
  try {
    const userId = req.user?.userId;
 
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
 
    // Find the cart and populate product details
    const cart = await Cart.findOne({ userId }).populate("products.productId", "name price category");
 
    // Return the cart or an empty list of products if no cart exists
    res.json(cart || { products: [] });
  } catch (error) {
    console.error("Error in getCart:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
// Add a product to the user's cart
exports.addToCart = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("User ID from Token:", req.user?.userId);
 
    const { productId, quantity } = req.body;
    const userId = req.user?.userId;
 
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
 
    // Verify the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
 
    // Find the user's cart or create a new one if it doesn't exist
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      console.log("Creating a new cart for the user...");
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    } else {
      // Check if the product already exists in the cart
      const existingProduct = cart.products.find((item) => item.productId.toString() === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity; // Increment quantity
      } else {
        cart.products.push({ productId, quantity }); // Add new product
      }
    }
 
    // Save the cart and return the updated cart
    await cart.save();
    console.log("updated cart:",cart);
    const populatedCart = await cart.populate("products.productId", "name price category").execPopulate();
    res.json(populatedCart);
  } catch (error) {
    console.error("Error in addToCart:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
// Remove a product from the user's cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user?.userId;
 
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
 
    // Find the user's cart
    let cart = await Cart.findOne({ userId });
    if (cart) {
      // Filter out the product to remove
      cart.products = cart.products.filter((item) => item.productId.toString() !== productId);
      await cart.save();
 
      // Populate the cart to include product details
      const populatedCart = await cart.populate("products.productId", "name price category").execPopulate();
      return res.json(populatedCart);
    }
 
    // Return an empty cart if no cart exists
    res.json({ products: [] });
  } catch (error) {
    console.error("Error in removeFromCart:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
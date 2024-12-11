const Cart = require('../Models/Cart');
 
// Get Cart by User ID
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('products.productId');
    if (!cart) return res.status(404).json({ msg: 'Cart not found' });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
 
// Add to Cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
 
    let cart = await Cart
    .findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, products: [] });
    }
 
    const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
 
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
 
module.exports = { getCart, addToCart };
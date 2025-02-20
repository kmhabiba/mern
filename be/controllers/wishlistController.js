const Wishlist = require("../Models/Wishlist");
 
exports.getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ userId: req.user.userId }).populate("products");
  res.json(wishlist || { products: [] });
};
 
exports.toggleWishlist = async (req, res) => {
  const { productId } = req.body;
  let wishlist = await Wishlist.findOne({ userId: req.user.userId });
 
  if (!wishlist) {
    wishlist = new Wishlist({ userId: req.user.userId, products: [productId] });
  } else {
    const index = wishlist.products.indexOf(productId);
    if (index > -1) wishlist.products.splice(index, 1);
    else wishlist.products.push(productId);
  }
 
  await wishlist.save();
  res.json(wishlist);
};
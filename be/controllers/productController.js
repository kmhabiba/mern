const Product = require('../Models/Product');
 
const addProduct = async (req, res) => {
  const { name, price,image,quantity } = req.body;
  console.log('Request payload:', req.body);
 
  if (!name || !price || !image || !quantity) {
    return res.status(400).json({ message: 'Name , price , image and quantity are required' });
  }
 
  try {
    const newProduct = new Product({ name, price , image, quantity});
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product' });
  }
};
 
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};
 
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  console.log('Product ID :', id);
  console.log('updated Data:',{name , price});
 
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }
 
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price },
      { new: true }
    );
 
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
 
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product' });
  }
};
 
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log('Product ID for deletion',id);
 
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
 
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
 
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};
 
module.exports = { addProduct, getProducts, updateProduct, deleteProduct };
const Category = require("../Models/Category");
const Product = require("../Models/Product");
const mongoose = require('mongoose');

const addProduct = async (req, res) => {
  const { name, price, quantity, category } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  console.log("Request payload:", req.body);

  if (!name || !price || !imagePath || !quantity || !category) {
    return res
      .status(400)
      .json({
        message: "name , price , image ,category and quantity are required",
      });
  }

  console.log("Request payload:",req.body);
  const categoryDoc = await Category.findOne({name: new RegExp(`^${category}$`,'i')});
  console.log("category found:",categoryDoc);

  if(!categoryDoc){
    return res.status(400).json({error: "Category not found"});
  }

  try {
    const newProduct = new Product({
      name,
      price,
      quantity,
      category: categoryDoc._id,
      image: imagePath,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    console.log("Category filter applied:", category);
 
    let filter = {};
 
    if (category) {
      let categoryDoc;
 
      // Check if the category is a valid ObjectId
      if (mongoose.Types.ObjectId.isValid(category)) {
        categoryDoc = await Category.findById(category); // Search by ObjectId
      } else {
        categoryDoc = await Category.findOne({ name: category }); // Search by name
      }
 
      if (!categoryDoc) {
        return res.status(404).json({ message: "Category not found" });
      }

      filter.category = categoryDoc._id;
    }
 
    const products = await Product.find(filter).populate('category', 'name');
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity, category } = req.body;
 
    // Build updated data object
    const updatedData = { name, price, quantity };
 
    // Handle category validation
    if (category) {
      let categoryDoc;
      if (mongoose.Types.ObjectId.isValid(category)) {
        categoryDoc = await Category.findById(category);
      } else {
        categoryDoc = await Category.findOne({ name: category });
      }
 
      if (!categoryDoc) {
        return res.status(404).json({ message: "Category not found" });
      }
      updatedData.category = categoryDoc._id;
    }
 
    // Handle image update if file is provided
    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }
 
    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
 
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("Product ID for deletion", id);

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct };
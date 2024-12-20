const Category = require("../Models/Category");
const Product = require("../Models/Product");

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

  try {
    const newProduct = new Product({
      name,
      price,
      quantity,
      category,
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
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const updateProduct = async (req, res) => {

  console.log("Request Body:" ,req.body);
  console.log("Upload FIle:" ,req.file);

  try {
    const { id } = req.params;
    const { name, price, quantity, category } = req.body;

    const updatedData = { name, price, quantity, category };
    console.log("updated data:",updatedData);

    if(req.file){
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
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
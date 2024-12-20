const Category = require('../Models/Category');
 
const addCategory = async (req, res) => {
  const { name, description } = req.body;
 
  console.log('Request payload:', req.body);
 
  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }
 
  try {
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    console.error('Error adding category:', error.message);
    res.status(500).json({ message: 'Error adding category' });
  }
};
 
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
 
  console.log('Category ID:', id);
  console.log('Updated Data:', { name, description });
 
  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }
 
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
 
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
 
    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    console.error('Error updating category:', error.message);
    res.status(500).json({ message: 'Error updating category' });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
 
  console.log('Category ID for deletion:', id);
 
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
 
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
 
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error.message);
    res.status(500).json({ message: 'Error deleting category' });
  }
};
 
module.exports = { addCategory, getCategories, updateCategory, deleteCategory };
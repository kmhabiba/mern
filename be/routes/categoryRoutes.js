const express = require('express');
const router = express.Router();
const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/', protect, authorize('admin'), addCategory); 
router.get('/', getCategories);
router.put('/:id', protect, authorize('admin'), updateCategory); 
router.delete('/:id', protect, authorize('admin'), deleteCategory); 

module.exports = router;
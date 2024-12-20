const express = require('express');
const router = express.Router();
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');
 
router.post('/', protect, addProduct); 
router.get('/', getProducts); 
router.put('/:id', protect, updateProduct);
//console.log('PUT route hit with ID:' , req.params.id) ;
router.delete('/:id', protect, deleteProduct);
 
module.exports = router;
const express = require('express');
const router = express.Router();
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');
const multer = require('multer');

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename:(req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });
 
router.post('/', protect, upload.single('image') , addProduct);
router.get('/', getProducts); 
router.put('/:id', protect, upload.single('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);
 
module.exports = router;
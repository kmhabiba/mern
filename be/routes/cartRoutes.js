// const express = require('express');
// const router = express.Router();
// const { getCart, addToCart } = require('../controllers/cartController');
// const authMiddleware = require('../middlewares/authMiddleware');
 
// router.get('/', authMiddleware, getCart);
// router.post('/add', authMiddleware, addToCart);
 
// module.exports = router;

const express = require('express');
const { getCart, addToCart } = require('../controllers/cartController'); // Correctly import controller functions
const { protect } = require('../middlewares/authMiddleware'); // Correctly import middleware
 
const router = express.Router();
 
// Define routes with middleware and controller
router.get('/cart', protect, getCart); // Ensure `protect` is a valid middleware function
router.post('/cart', protect, addToCart); // Ensure `addToCart` is a valid controller function
 
module.exports = router;
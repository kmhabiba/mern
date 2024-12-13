const express = require('express');
const { registerUser,
    loginUser,
    forgotPassword,
    resetPassword
} = require('../controllers/authController');
const { authorize } = require('../middlewares/authMiddleware');


const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get('/dashboard' , authorize(['admin']) , (req, res) => { // removing temporary , authorize(['admin'])
    console.log('admin dashboard accessed');
    res.json({ message: 'Welcome to the admin dashboard! with middleware' });
    //res.json({ message: 'Welcome to the admin dashboard without middleware' });
  });
   
  router.get('/user-home', authorize(['user']), (req, res) => {
    res.json({ message: 'Welcome to the user dashboard!' });
  });


module.exports = router;
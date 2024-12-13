const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const { removeAllListeners } = require('nodemon');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

    try {

      token = req.headers.authorization.split(' ')[1];
      console.log('token received:',token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token :',decode);

      req.user = await User.findById(decoded.id).select('-password');
      console.log('user fetch from DB',user);

      if(!user) {
        return res.status(401).json({message:"user not found"})
      }
      req.user = user;

      next();

    } catch (error) {

      console.log('error verifying token :' , error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {

    console.log('no token found in req');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

exports.authorize = (roles) => {
  return (req, res, next) => {
    console.log('roles alowed:',roles);
    console.log('User role:',req.user?.role);
    console.log('Middleware executed:', req.user);

    if (roles.user || !roles.includes(req.user.role)) {
      console.log('Insufficient permission');
      return res.status(403).json({ message: 'Access denied, insufficient permissions' });
    }
    console.log('access granted');
    next();
  };
};

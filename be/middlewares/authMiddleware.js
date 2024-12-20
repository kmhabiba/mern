const jwt = require('jsonwebtoken');
const User = require('../Models/user'); 
exports.protect = async (req, res, next) => {  let token;
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password');
 
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
 
            req.user = user;
            next(); 
        } else {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }
    } catch (error) {
        console.error('Error verifying token:', error.message);
        res.status(401).json({ message: 'Not authorized, invalid token' });
 }
};

exports.authorize = (roles) => {
    return (req, res, next) => {
      console.log('roles alowed:',roles);
      console.log('User role:',req.user?.role);
      console.log('Middleware executed:', req.user);
  
      if ( !roles.includes(req.user.role)) { // temporary removing roles.user || 
        console.log('Insufficient permission');
        return res.status(403).json({ message: 'Access denied, insufficient permissions' });
      }
      console.log('access granted');
      next();
    };
  };
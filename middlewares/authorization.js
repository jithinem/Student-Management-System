const jwt = require('jsonwebtoken');


const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.user_type === 'admin') {
      return next();
    }
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  };


  const authorizeStudent = (req, res, next) => {
    if (req.user && req.user.user_type === 'student') {
      return next(); 
    }
    return res.status(403).json({ message: 'Access denied. Students only.' });
  };
  

  const authorizeAdminOrStudent = (req, res, next) => {
    if (req.user && (req.user.user_type === 'admin' || req.user.user_type === 'student')) {
      return next(); 
    }
    return res.status(403).json({ message: 'Access denied. Admins or students only.' });
  };

  module.exports = {
    authorizeAdmin,
    authorizeStudent,
    authorizeAdminOrStudent
  }
  
  

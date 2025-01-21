const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access token is missing or invalid.' });
    }
  
    try {
        console.warn(token,"token");
        
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.warn(decoded,"decoded");
      
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };

  module.exports = {
    authenticateToken
  }
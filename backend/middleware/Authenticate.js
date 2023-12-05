
const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const generateRandomSecretKey = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Example usage:
const secretKey = generateRandomSecretKey(); 

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token found' });
  }

  jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token expired or invalid' });
    }

    req.user = decoded; // Attach user data to request object
    next(); // Continue to the next middleware or route handler
  });
};

const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' }); // Example token with 1-hour expiration
    return token;
};

module.exports = {
  generateToken,
  verifyToken,
};
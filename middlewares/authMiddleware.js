const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Update to bcryptjs


const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).send({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
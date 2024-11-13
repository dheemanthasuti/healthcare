// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Access denied.');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token.');
    if (roles.length && !roles.includes(user.role)) return res.status(403).send('Permission denied.');
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;

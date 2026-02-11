const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = process.env.JWT_SECRET || 'pal-brothers-jwt-secret';

const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return next();
  try {
    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.userId).select('-password');
    if (user) req.user = user;
  } catch (e) { /* ignore */ }
  next();
};

const requireAuth = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Authentication required' });
  next();
};

const signToken = (userId) => jwt.sign({ userId }, secret, { expiresIn: '7d' });

module.exports = { optionalAuth, requireAuth, signToken };
module.exports.secret = secret;

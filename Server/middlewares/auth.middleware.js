const jwt = require('jsonwebtoken');
const Owner = require('../models/owner.model');
const User = require('../models/user.model');
const { ownerLogger } = require('../utils/logger');
const { userLogger } = require('../utils/logger');

const protectUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        userLogger.warn(`Auth failed - User not found for token`);
        return res.status(401).json({ message: 'Not authorized' });
      }

      next();
    } catch (error) {
      userLogger.error(`Auth error: ${error.message}`);
      return res.status(401).json({ message: 'Token not valid' });
    }
  }

  if (!token) {
    userLogger.warn(`Auth failed - No token provided`);
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const protectOwner = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.owner = await Owner.findById(decoded.id).select('-password');

      if (!req.owner) {
        ownerLogger.warn(`Auth failed - Owner not found for token`);
        return res.status(401).json({ message: 'Not authorized' });
      }

      next();
    } catch (error) {
      ownerLogger.error(`Auth error: ${error.message}`);
      return res.status(401).json({ message: 'Token not valid' });
    }
  }

  if (!token) {
    ownerLogger.warn(`Auth failed - No token provided`);
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protectOwner, protectUser };

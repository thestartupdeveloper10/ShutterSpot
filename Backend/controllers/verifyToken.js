const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const extractToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

const verifyToken = (req, res, next) => {
  const token = extractToken(req);
  
  if (!token) {
    return next(createError(401, 'No token provided'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(createError(401, 'Token expired'));
    }
    return next(createError(403, 'Invalid token'));
  }
};

const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  
  if (!refreshToken) {
    return next(createError(401, 'No refresh token provided'));
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(createError(403, 'Invalid refresh token'));
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(createError(401, 'User not authenticated'));
    }
    
    if (!roles.includes(req.user.role)) {
      return next(createError(403, 'User not authorized for this action'));
    }
    
    next();
  };
};

const verifyOwnership = (req, res, next) => {
  if (req.user.id !== req.params.id && req.user.role !== 'admin') {
    return next(createError(403, 'You are not authorized to perform this action'));
  }
  next();
};

module.exports = {
  verifyToken,
  verifyRefreshToken,
  authorizeRoles,
  verifyOwnership
};
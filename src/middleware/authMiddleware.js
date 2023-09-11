const jwt = require("jsonwebtoken");
require('dotenv').config();

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Access denied' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar si el token ha expirado
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTimeInSeconds) {
      return res.status(401).json({ error: 'TokenExpired', message: 'Token has expired' });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'InvalidToken', message: 'Invalid token' });
  }
}

module.exports = authenticateToken;

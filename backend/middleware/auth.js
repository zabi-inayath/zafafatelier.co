const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'zafaf_atelier_super_secret_jwt_key_2026_islamic_bespoke');

    const [rows] = await pool.query('SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?', [decoded.id]);
    if (!rows || rows.length === 0) {
      return res.status(401).json({ success: false, message: 'User belonging to this token no longer exists.' });
    }

    req.user = rows[0];
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
}

async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'zafaf_atelier_super_secret_jwt_key_2026_islamic_bespoke');
      const [rows] = await pool.query('SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?', [decoded.id]);
      if (rows && rows.length > 0) {
        req.user = rows[0];
      }
    }
  } catch (err) {
    // Ignore invalid token in optionalAuth
  }
  next();
}

module.exports = { verifyToken, optionalAuth };

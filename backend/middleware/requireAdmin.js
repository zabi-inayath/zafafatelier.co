/**
 * Middleware: requireAdmin
 * Ensures the authenticated user has role === 'admin'.
 * Must be used after verifyToken.
 */
function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Administrative privileges required.'
    });
  }

  next();
}

module.exports = requireAdmin;

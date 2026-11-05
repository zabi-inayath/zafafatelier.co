const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');
const adminController = require('../controllers/adminController');
const invitationController = require('../controllers/invitationController');

// All admin routes require valid JWT and role === 'admin'
router.use(verifyToken, requireAdmin);

// ── Dashboard Overview ──
router.get('/stats', adminController.getDashboardStats);

// ── Order Management ──
router.get('/orders', adminController.listOrders);
router.get('/orders/:id', adminController.getOrderById);
router.put('/orders/:id', adminController.updateOrder);

// ── Invitation Management ──
router.get('/invitations', invitationController.listInvitations);
router.post('/invitations', invitationController.createInvitation);
router.get('/invitations/:id', invitationController.getInvitationById);
router.put('/invitations/:id', invitationController.updateInvitation);
router.post('/invitations/:id/publish', invitationController.publishInvitation);
router.post('/invitations/:id/unpublish', invitationController.unpublishInvitation);
router.delete('/invitations/:id', invitationController.archiveInvitation);

module.exports = router;

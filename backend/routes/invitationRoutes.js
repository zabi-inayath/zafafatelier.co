const express = require('express');
const router = express.Router();
const invitationController = require('../controllers/invitationController');

// Public route to view a published invitation by unique slug
router.get('/:slug', invitationController.getPublicInvitation);

module.exports = router;

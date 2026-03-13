const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/users/:id/documents
// @desc    View verification documents for a user
// @access  Private (User or Admin)
router.get('/:id/documents', documentController.getUserDocuments);
router.get('/:id/documents', protect, documentController.getUserDocuments);

// @route   PUT /api/users/:id/role
// @desc    Update user role
// @access  Private
router.put('/:id/role', protect, userController.updateRole);

// @route   PUT /api/users/:id/onboarding
// @desc    Save onboarding details and set profile to complete
// @access  Private
router.put('/:id/onboarding', protect, userController.saveOnboardingProfile);

module.exports = router;

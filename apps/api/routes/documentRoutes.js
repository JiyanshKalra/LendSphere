const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// @route   POST /api/documents
// @desc    Upload/record a verification document
// @access  Private (Borrower)
router.post('/', documentController.uploadDocument);

module.exports = router;

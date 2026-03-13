const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/messages
// @desc    Send a new message to a loan chat thread
// @access  Private (Borrower or Lender involved in loan)
router.post('/', protect, messageController.sendMessage);

module.exports = router;

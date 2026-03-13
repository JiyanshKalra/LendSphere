const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:userId', protect, profileController.getProfile);
router.put('/:userId', protect, profileController.updateProfile);

module.exports = router;

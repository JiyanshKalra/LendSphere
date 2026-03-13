const profileService = require('../services/profileService');

// @desc    Get user profile
// @route   GET /api/profile/:userId
// @access  Private
const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Optional: Check if the requesting user is the owner of the profile, or an admin
    // if (req.user._id.toString() !== userId && req.user.role !== 'admin') {
    //    return res.status(403).json({ message: 'Not authorized to access this profile' });
    // }

    const profile = await profileService.getProfileByUserId(userId);
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile/:userId
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profileData = req.body;

    // Optional: Security check to prevent users from updating others' profiles
    // if (req.user._id.toString() !== userId && req.user.role !== 'admin') {
    //    return res.status(403).json({ message: 'Not authorized to update this profile' });
    // }

    const updatedProfile = await profileService.updateProfile(userId, profileData);
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};

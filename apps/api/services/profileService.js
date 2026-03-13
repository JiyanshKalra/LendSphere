const Profile = require('../models/Profile');

const getProfileByUserId = async (userId) => {
  let profile = await Profile.findOne({ userId }).populate('userId', 'name email role');

  if (!profile) {
    // Return a default, or create one on the fly if requested
    // Creating one on the fly here to ensure a profile always exists when fetched
    profile = await Profile.create({ userId });
    profile = await Profile.findById(profile._id).populate('userId', 'name email role');
  }

  return profile;
};

const updateProfile = async (userId, profileData) => {
  // Find and update, or insert if it doesn't exist (upsert)
  const profile = await Profile.findOneAndUpdate(
    { userId },
    { $set: profileData },
    { new: true, upsert: true, runValidators: true }
  ).populate('userId', 'name email role');

  return profile;
};

module.exports = {
  getProfileByUserId,
  updateProfile,
};

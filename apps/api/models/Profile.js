const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true
  },
  income: {
    type: Number,
    default: 0,
  },
  assets: {
    type: Number,
    default: 0,
  },
  loanScore: {
    type: Number,
    default: 0,
  },
  totalLoansTaken: {
    type: Number,
    default: 0,
  },
  loansCompleted: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;

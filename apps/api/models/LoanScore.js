const mongoose = require('mongoose');

const loanScoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true
  },
  currentScore: {
    type: Number,
    default: 500, // Base starting score
  },
  scoreUsed: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true 
});

// Calculate available score (virtual property, optional but handy)
loanScoreSchema.virtual('availableScore').get(function() {
  return Math.max(0, this.currentScore - this.scoreUsed);
});

const LoanScore = mongoose.model('LoanScore', loanScoreSchema);

module.exports = LoanScore;

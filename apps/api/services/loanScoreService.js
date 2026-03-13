const LoanScore = require('../models/LoanScore');

const CAPACITY_PER_SCORE = 100;

/**
 * Ensures a user has a LoanScore document. Creates one if it doesn't exist.
 */
const getOrCreateLoanScore = async (userId) => {
  let loanScore = await LoanScore.findOne({ userId });
  if (!loanScore) {
    loanScore = await LoanScore.create({ userId });
  }
  return loanScore;
};

/**
 * Calculates borrowing capacity in Rupees (or configured currency).
 * Formula: (currentScore - scoreUsed) * 100
 */
const getBorrowingCapacity = async (userId) => {
  const loanScore = await getOrCreateLoanScore(userId);
  const availableScore = loanScore.currentScore - loanScore.scoreUsed;
  return Math.max(0, availableScore * CAPACITY_PER_SCORE);
};

/**
 * Processes a new loan request against the user's score.
 * Validates capacity and increases scoreUsed.
 */
const useScoreForLoan = async (userId, loanAmount) => {
  if (loanAmount <= 0) throw new Error('Loan amount must be greater than zero');

  const loanScore = await getOrCreateLoanScore(userId);
  const capacity = Math.max(0, (loanScore.currentScore - loanScore.scoreUsed) * CAPACITY_PER_SCORE);
  
  if (loanAmount > capacity) {
    throw new Error(`Insufficient borrowing capacity. Required: ₹${loanAmount}, Available: ₹${capacity}`);
  }

  // Calculate score required (allowing fractional points for exactness)
  const scoreRequired = loanAmount / CAPACITY_PER_SCORE;
  
  loanScore.scoreUsed += scoreRequired;
  loanScore.lastUpdated = Date.now();
  
  await loanScore.save();
  return loanScore;
};

/**
 * Processes a loan repayment. Restores scoreUsed, and applies penalty if late.
 */
const restoreScoreOnRepayment = async (userId, loanAmount, isLate = false, penaltyPoints = 10) => {
  if (loanAmount <= 0) throw new Error('Loan amount must be greater than zero');

  const loanScore = await getOrCreateLoanScore(userId);
  
  const scoreRestored = loanAmount / CAPACITY_PER_SCORE;
  
  // Restore the score usage
  loanScore.scoreUsed = Math.max(0, loanScore.scoreUsed - scoreRestored);
  
  // Apply penalty if late
  if (isLate) {
    loanScore.currentScore = Math.max(0, loanScore.currentScore - penaltyPoints);
  }
  
  loanScore.lastUpdated = Date.now();
  
  await loanScore.save();
  return loanScore;
};

module.exports = {
  CAPACITY_PER_SCORE,
  getOrCreateLoanScore,
  getBorrowingCapacity,
  useScoreForLoan,
  restoreScoreOnRepayment
};

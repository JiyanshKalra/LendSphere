/**
 * Calculates a basic loan score based on several factors.
 * In a real application, this would be much more complex and likely involve AI/ML models.
 * 
 * @param {Object} userData - Data about the user.
 * @param {number} userData.creditScore - The user's credit score (e.g., 300-850).
 * @param {number} userData.annualIncome - The user's annual income.
 * @param {number} userData.totalDebt - The user's total outstanding debt.
 * @param {number} userData.employmentHistoryMonths - Number of months employed.
 * @returns {number} A loan score from 0 to 100, where 100 is best.
 */
function calculateLoanScore(userData) {
  const { creditScore, annualIncome, totalDebt, employmentHistoryMonths } = userData;

  let score = 0;

  // Credit Score Factor (Max 40 points)
  if (creditScore >= 800) score += 40;
  else if (creditScore >= 740) score += 35;
  else if (creditScore >= 670) score += 25;
  else if (creditScore >= 580) score += 10;
  
  // Debt-to-Income (DTI) Ratio Factor (Max 30 points)
  const monthlyIncome = annualIncome / 12;
  const dti = monthlyIncome > 0 ? (totalDebt / monthlyIncome) : 1; // Prevent division by zero

  if (dti <= 0.20) score += 30;
  else if (dti <= 0.35) score += 20;
  else if (dti <= 0.45) score += 10;
  
  // Employment History Factor (Max 30 points)
  if (employmentHistoryMonths >= 60) score += 30; // 5+ years
  else if (employmentHistoryMonths >= 24) score += 20; // 2-5 years
  else if (employmentHistoryMonths >= 12) score += 10; // 1-2 years

  return Math.min(Math.max(score, 0), 100);
}

/**
 * Determines the risk tier based on the loan score.
 * 
 * @param {number} loanScore - The calculated loan score (0-100).
 * @returns {string} The risk tier (e.g., 'A', 'B', 'C', 'D').
 */
function determineRiskTier(loanScore) {
  if (loanScore >= 85) return 'A'; // Lowest risk, best rates
  if (loanScore >= 70) return 'B';
  if (loanScore >= 50) return 'C';
  return 'D'; // Highest risk
}

module.exports = {
  calculateLoanScore,
  determineRiskTier
};

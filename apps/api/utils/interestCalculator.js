/**
 * Calculates the monthly payment for a loan (amortization formula).
 * 
 * @param {number} principal - The total loan amount.
 * @param {number} annualInterestRate - The annual interest rate as a decimal (e.g., 0.05 for 5%).
 * @param {number} termMonths - The duration of the loan in months.
 * @returns {number} The fixed monthly payment amount.
 */
function calculateMonthlyPayment(principal, annualInterestRate, termMonths) {
  if (annualInterestRate === 0) {
    return principal / termMonths;
  }
  
  const monthlyInterestRate = annualInterestRate / 12;
  const mathPower = Math.pow(1 + monthlyInterestRate, termMonths);
  
  const monthlyPayment = (principal * monthlyInterestRate * mathPower) / (mathPower - 1);
  return Number(monthlyPayment.toFixed(2));
}

/**
 * Calculates the total interest paid over the life of the loan.
 * 
 * @param {number} principal - The total loan amount.
 * @param {number} monthlyPayment - The calculated fixed monthly payment.
 * @param {number} termMonths - The duration of the loan in months.
 * @returns {number} Total interest paid.
 */
function calculateTotalInterest(principal, monthlyPayment, termMonths) {
  const totalPaid = monthlyPayment * termMonths;
  return Number((totalPaid - principal).toFixed(2));
}

/**
 * Calculates the recommended interest rate based on the risk tier.
 * 
 * @param {string} riskTier - The risk tier (e.g., 'A', 'B', 'C', 'D').
 * @param {number} baseRate - The current base interest rate in the platform.
 * @returns {number} The recommended annual interest rate as a decimal.
 */
function calculateRecommendedRateForTier(riskTier, baseRate = 0.04) {
  const riskPremiums = {
    'A': 0.01,  // +1% for Tier A (Lowest Risk)
    'B': 0.035, // +3.5% for Tier B
    'C': 0.08,  // +8% for Tier C
    'D': 0.15   // +15% for Tier D (Highest Risk)
  };

  const premium = riskPremiums[riskTier] || riskPremiums['D'];
  return baseRate + premium;
}

module.exports = {
  calculateMonthlyPayment,
  calculateTotalInterest,
  calculateRecommendedRateForTier
};

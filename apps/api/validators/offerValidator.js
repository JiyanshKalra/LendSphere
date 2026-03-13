/**
 * Validates a loan offer creation request (when an investor makes an offer on a loan).
 * 
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 */
function validateOfferRequest(req, res, next) {
  const { loanId, investorId, amountOffered, interestRate } = req.body;

  const errors = [];

  if (!loanId) {
    errors.push('Loan ID is required to make an offer.');
  }

  if (!investorId) {
    errors.push('Investor ID is required.');
  }

  if (!amountOffered || typeof amountOffered !== 'number' || amountOffered <= 0) {
    errors.push('A valid positive offer amount is required.');
  }

  if (!interestRate || typeof interestRate !== 'number' || interestRate <= 0) {
    // Basic check. Usually interest rate is a decimal like 0.05
    errors.push('A valid positive interest rate is required.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
}

module.exports = {
  validateOfferRequest
};

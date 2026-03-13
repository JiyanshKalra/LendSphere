/**
 * Validates a loan creation or update request.
 * 
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 */
function validateLoanRequest(req, res, next) {
  const { amount, termMonths, purpose, borrowerId } = req.body;

  const errors = [];

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    errors.push('A valid positive loan amount is required.');
  }

  if (!termMonths || typeof termMonths !== 'number' || termMonths <= 0) {
    errors.push('A valid positive loan term (in months) is required.');
  }

  if (!purpose || typeof purpose !== 'string' || purpose.trim() === '') {
    errors.push('Loan purpose string is required.');
  }

  if (!borrowerId) {
    errors.push('Borrower ID is required.');
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
  validateLoanRequest
};

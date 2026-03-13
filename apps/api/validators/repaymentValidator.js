/**
 * Validates a repayment submission request.
 * 
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 */
function validateRepaymentRequest(req, res, next) {
  const { loanId, borrowerId, amountPaid } = req.body;

  const errors = [];

  if (!loanId) {
    errors.push('Loan ID is required for repayment.');
  }

  if (!borrowerId) {
    errors.push('Borrower ID is required.');
  }

  if (!amountPaid || typeof amountPaid !== 'number' || amountPaid <= 0) {
    errors.push('A valid positive payment amount is required.');
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
  validateRepaymentRequest
};

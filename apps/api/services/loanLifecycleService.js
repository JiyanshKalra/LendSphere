const Loan = require('../models/Loan');

class LoanLifecycleService {
  /**
   * Helper to fetch a loan and throw if not found.
   */
  static async getLoanOrThrow(loanId) {
    const loan = await Loan.findById(loanId);
    if (!loan) {
      throw new Error(`Loan with ID ${loanId} not found.`);
    }
    return loan;
  }

  /**
   * Helper to validate the current state before transitioning.
   */
  static validateState(loan, expectedStates, actionName) {
    const states = Array.isArray(expectedStates) ? expectedStates : [expectedStates];
    if (!states.includes(loan.status)) {
      throw new Error(`Cannot perform '${actionName}' when loan status is '${loan.status}'. Expected status to be one of: [${states.join(', ')}].`);
    }
  }

  /**
   * Transitions a loan from 'pending' to 'open_for_offers'.
   */
  static async openLoanForOffers(loanId) {
    const loan = await this.getLoanOrThrow(loanId);
    this.validateState(loan, 'pending', 'openLoanForOffers');

    loan.status = 'open_for_offers';
    return await loan.save();
  }

  /**
   * Transitions a loan from 'open_for_offers' to 'offer_selected'.
   * 
   * @param {string} loanId - The ID of the loan
   * @param {string} offerId - The ID of the accepted offer
   * @param {number} interestRate - The interest rate from the accepted offer
   */
  static async acceptOffer(loanId, offerId, interestRate) {
    const loan = await this.getLoanOrThrow(loanId);
    this.validateState(loan, 'open_for_offers', 'acceptOffer');

    // Here you would typically also cross-check that the offerId belongs to this loan
    // and potentially mark other offers as rejected.

    loan.status = 'offer_selected';
    if (interestRate !== undefined) {
      loan.interestRate = interestRate;
    }
    
    return await loan.save();
  }

  /**
   * Transitions a loan from 'offer_selected' to 'funded'.
   */
  static async markLoanFunded(loanId) {
    const loan = await this.getLoanOrThrow(loanId);
    this.validateState(loan, 'offer_selected', 'markLoanFunded');

    loan.status = 'funded';
    return await loan.save();
  }

  /**
   * Transitions a loan from 'funded' to 'repayment'.
   */
  static async startRepayment(loanId) {
    const loan = await this.getLoanOrThrow(loanId);
    this.validateState(loan, 'funded', 'startRepayment');

    loan.status = 'repayment';
    return await loan.save();
  }

  /**
   * Transitions a loan from 'repayment' to 'completed'.
   */
  static async completeLoan(loanId) {
    const loan = await this.getLoanOrThrow(loanId);
    
    // In some edge cases, a loan might be completed immediately from funded 
    // without explicitly taking a 'repayment' step if it's paid instantly,
    // but strict workflow requires 'repayment' first.
    this.validateState(loan, 'repayment', 'completeLoan');

    loan.status = 'completed';
    return await loan.save();
  }

  /**
   * Transitions a loan from 'pending' or 'open_for_offers' to 'expired'.
   */
  static async expireLoan(loanId) {
    const loan = await this.getLoanOrThrow(loanId);
    this.validateState(loan, ['pending', 'open_for_offers'], 'expireLoan');

    loan.status = 'expired';
    return await loan.save();
  }
  
  /**
   * Transtions a loan from 'pending' to 'rejected'
   */
  static async rejectLoan(loanId) {
    const loan = await this.getLoanOrThrow(loanId);
    this.validateState(loan, 'pending', 'rejectLoan');
    
    loan.status = 'rejected';
    return await loan.save();
  }
}

module.exports = LoanLifecycleService;

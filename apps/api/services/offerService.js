const LoanOffer = require('../models/LoanOffer');
const Loan = require('../models/Loan');

class OfferService {
  /**
   * Submits a new loan offer from a lender.
   * 
   * @param {Object} offerData - Data for the loan offer.
   * @returns {Promise<Object>} The created offer document.
   */
  static async createOffer(offerData) {
    try {
      // Verify loan exists and is open for offers
      const loan = await Loan.findById(offerData.loanId);
      if (!loan) throw new Error('Loan not found');
      if (loan.status !== 'open_for_offers') {
        throw new Error('Loan is not currently accepting offers');
      }

      const offer = new LoanOffer(offerData);
      const savedOffer = await offer.save();
      return savedOffer;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves all offers for a specific loan.
   * 
   * @param {string} loanId - The ID of the loan.
   * @returns {Promise<Array>} A list of offer documents.
   */
  static async getOffersForLoan(loanId) {
    try {
      const offers = await LoanOffer.find({ loanId })
        .sort({ createdAt: -1 })
        // .populate('lenderId', 'name rating') // Populate lender info if needed
        .exec();
        
      return offers;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Accepts an offer. This should also mark the loan as 'offer_selected' 
   * and potentially reject all other pending offers for this loan.
   * 
   * @param {string} offerId - The ID of the offer to accept.
   * @param {string} borrowerId - The ID of the borrower (for authorization).
   * @returns {Promise<Object>} The accepted offer document.
   */
  static async acceptOffer(offerId, borrowerId) {
    // We would use a MongoDB transaction in production here
    try {
      const offer = await LoanOffer.findById(offerId).populate('loanId');
      
      if (!offer) throw new Error('Offer not found');
      if (offer.status !== 'pending') throw new Error('Offer is not pending');
      
      const loan = offer.loanId;
      
      // Authorization check (in reality, compare with borrowerId)
      if (loan.borrowerId.toString() !== borrowerId.toString()) {
        throw new Error('Not authorized to accept an offer for this loan');
      }

      if (loan.status !== 'open_for_offers') {
        throw new Error('Loan is no longer accepting offers');
      }

      // Mark this offer as accepted
      offer.status = 'accepted';
      const acceptedOffer = await offer.save();

      // Mark all other offers for this loan as rejected
      await LoanOffer.updateMany(
        { loanId: loan._id, _id: { $ne: offerId }, status: 'pending' },
        { status: 'rejected' }
      );

      // Update the loan status and apply the accepted terms
      loan.status = 'offer_selected';
      loan.interestRate = offer.interestRate;
      loan.repaymentPeriod = offer.repaymentPeriod; // In case the lender proposed a different term
      await loan.save();

      return acceptedOffer;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OfferService;

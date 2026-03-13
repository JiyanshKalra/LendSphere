const Message = require('../models/Message');

class MessageService {
  /**
   * Saves a new message to the database.
   * 
   * @param {Object} messageData - Data for the message.
   * @returns {Promise<Object>} The created message document.
   */
  static async createMessage(messageData) {
    try {
      const message = new Message({
        ...messageData,
        timestamp: messageData.timestamp || new Date()
      });
      const savedMessage = await message.save();
      return savedMessage;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the chat thread/messages for a specific loan.
   * 
   * @param {string} loanId - The ID of the loan.
   * @returns {Promise<Array>} A list of message documents, ordered by timestamp.
   */
  static async getMessagesForLoan(loanId) {
    try {
      const messages = await Message.find({ loanId })
        .sort({ timestamp: 1 }) // Chronological order (oldest to newest)
        .populate('senderId', 'name') // Populate sender info
        .exec();
        
      return messages;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MessageService;

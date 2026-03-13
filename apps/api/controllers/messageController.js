const MessageService = require('../services/messageService');

/**
 * Controller for sending a new message.
 */
const sendMessage = async (req, res) => {
  try {
    const { loanId, message, timestamp } = req.body;
    const senderId = req.user.id;
    
    const newMessage = await MessageService.createMessage({
      loanId,
      senderId,
      message,
      timestamp
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to send message'
    });
  }
};

/**
 * Controller for fetching all messages in a loan's thread.
 */
const getMessagesForLoan = async (req, res) => {
  try {
    const loanId = req.params.loanId || req.params.id;

    // We should authorize here to ensure req.user.id is either the borrower or an active lender on the loan...

    const messages = await MessageService.getMessagesForLoan(loanId);

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
      error: error.message
    });
  }
};

module.exports = {
  sendMessage,
  getMessagesForLoan
};

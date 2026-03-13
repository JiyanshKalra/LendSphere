const Document = require('../models/Document');

class DocumentService {
  /**
   * Uploads/Records a new document for a user.
   * 
   * @param {Object} documentData - Data for the document.
   * @returns {Promise<Object>} The created document record.
   */
  static async createDocument(documentData) {
    try {
      const document = new Document(documentData);
      const savedDocument = await document.save();
      return savedDocument;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves all documents for a specific user.
   * 
   * @param {string} userId - The ID of the user.
   * @returns {Promise<Array>} A list of document records.
   */
  static async getDocumentsForUser(userId) {
    try {
      const documents = await Document.find({ userId })
        .sort({ createdAt: -1 })
        .exec();
        
      return documents;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates the verification status of a document.
   * 
   * @param {string} documentId - The ID of the document.
   * @param {string} newStatus - The new status ('verified' or 'rejected').
   * @returns {Promise<Object>} The updated document.
   */
  static async updateDocumentStatus(documentId, newStatus) {
    try {
      const document = await Document.findByIdAndUpdate(
        documentId, 
        { status: newStatus }, 
        { new: true, runValidators: true }
      );
      
      if (!document) {
        throw new Error('Document not found');
      }
      
      return document;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DocumentService;

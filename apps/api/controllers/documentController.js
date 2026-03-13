const DocumentService = require('../services/documentService');

/**
 * Controller for uploading/recording a verification document.
 */
const uploadDocument = async (req, res) => {
  try {
    const { userId, documentType, fileUrl } = req.body;
    
    // In reality, file upload would happen via middleware (like multer) 
    // to an S3 bucket or similar, and we'd construct the fileUrl in the controller.
    // Here we'll assume the client upload directly or provided the URL.
    
    const newDocument = await DocumentService.createDocument({
      userId, // Prod: ensure req.user.id matches userId or handle auth
      documentType,
      fileUrl
    });

    res.status(201).json({
      success: true,
      message: 'Document uploaded successfully',
      data: newDocument
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to upload document'
    });
  }
};

/**
 * Controller for fetching documents belonging to a user.
 */
const getUserDocuments = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const documents = await DocumentService.getDocumentsForUser(userId);

    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents
    });
  } catch (error) {
    console.error('Error fetching user documents:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch documents',
      error: error.message
    });
  }
};

module.exports = {
  uploadDocument,
  getUserDocuments
};

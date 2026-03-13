const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming a User model will exist
    required: true
  },
  documentType: {
    type: String,
    required: true,
    enum: [
      'identity',      // Passport, Driver's License, National ID
      'income',        // Pay stubs, tax returns, bank statements
      'address',       // Utility bill
      'collateral'     // Proof of ownership for collateral
    ]
  },
  fileUrl: {
    type: String,
    required: true,
    trim: true,
    // In a real application, this would be a URL pointing to AWS S3, Google Cloud Storage, etc.
  },
  status: {
    type: String,
    enum: [
      'pending',  // Uploaded, waiting for admin/system verification
      'verified', // Approved
      'rejected'  // Validation failed
    ],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

documentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;

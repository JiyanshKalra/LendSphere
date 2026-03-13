const mongoose = require('mongoose');

const repaymentSchema = new mongoose.Schema({
  loanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loan',
    required: true
  },
  amountPaid: {
    type: Number,
    required: true,
    min: [0.01, 'Payment amount must be greater than zero']
  },
  remainingBalance: {
    type: Number,
    required: true,
    min: [0, 'Remaining balance cannot be negative']
  },
  paymentDate: {
    type: Date,
    default: Date.now
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

repaymentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Repayment = mongoose.model('Repayment', repaymentSchema);

module.exports = Repayment;

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  experience: { type: String },
  salaryExpectation: { type: String }, // sadece 'job' için anlamlı
  opportunityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity', required: true },
  opportunityType: { type: String, enum: ['job', 'intern', 'scholar'], required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'],
  default: 'pending'
  },
  rejectionMessage: { type: String, default: ''}
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);

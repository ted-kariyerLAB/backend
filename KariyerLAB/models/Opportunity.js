const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },                 // İlan başlığı
  description: { type: String, required: true },           // İlan detayları
  type: { type: String, enum: ['job', 'intern', 'scholar'], required: true }, // İlan türü
});

module.exports = mongoose.model('Opportunity', opportunitySchema);

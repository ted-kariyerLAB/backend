const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    companyPhone: { type: String, required: true },
    companySector: { type: String, required: true },
    companyRating: { type: Number, default: 0 },
    photo: { type: String },
    reviews: [
    {
        studentEmail: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String },
        statusGiven: { type: String, enum: ['accepted', 'rejected'], required: true },
        createdAt: { type: Date, default: Date.now }
    }
    ],
});

module.exports = mongoose.model('Company', CompanySchema);

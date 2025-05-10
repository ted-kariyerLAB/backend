const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    companyPhone: { type: String, required: true },
    companySector: { type: String, required: true },
});

module.exports = mongoose.model('Company', CompanySchema);

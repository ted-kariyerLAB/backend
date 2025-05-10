const mongoose = require('mongoose');

const scholarSchema = new mongoose.Schema({
    scholarName: { type: String, required: true },
    title: { type: String, required: true },
    deadline: { type: Date, required: true },
    description: { type: String },
    type: { type: String, required: true }, 
    organisationName: { type: String, required: true },
    organisationEmail: { type: String, required: true },
    organisationPhone: { type: String, required: true },
    organisationAddress: { type: String, required: true },
    organisationWebsite: { type: String, required: true },
});

module.exports = mongoose.model('Scholar', scholarSchema);


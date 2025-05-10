const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
    internshipName: { type: String, required: true }, 
    title: { type: String, required: true }, 
    deadline: { type: Date, required: true },
    description: { type: String ,required: true },
    location: { type: String, required: true }, // hybrid, remote, or on-site
    stipend: { type: String, required: true }, // stipend for the internship
    duration: { type: String, required: true }, // 3 months, 6 months, etc.
    eligibility: { type: String, required: true }, // eligibility criteria
    skills: { type: String, required: true }, // skills required for the internship
    type: { type: String, required: true }, // mandatory , optional , candidate , long term
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true },
    companyPhone: { type: String, required: true },
    companyAddress: { type: String, required: true },
    companyWebsite: { type: String, required: true },
});

module.exports = mongoose.model('Internship', internshipSchema);


const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: { type: String, required: true }, // Company name
    title: { type: String, required: true }, // 
    deadline: { type: Date, required: true },
    description: { type: String },
    type:{ type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);

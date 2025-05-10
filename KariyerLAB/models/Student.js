const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    university: { type: String, required: true },
    department: { type: String, required: true },
});

module.exports = mongoose.model('Student', StudentSchema);

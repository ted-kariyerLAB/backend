const Internship = require('../models/Internship');

exports.getAllInternship = async (req, res) => {
    try {
        const internships = await Internship.find();
        res.json(internships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getInternshipById = async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id);
        if (!internship) return res.status(404).json({ message: 'Internship not found' });
        res.json(internship);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createInternship = async (req, res) => {
    try {
        const { internshipName, title, deadline, description, location, stipend, duration, eligibility, skills, type, companyName, companyEmail, companyPhone, companyAddress, companyWebsite } = req.body;
        const newInternship = new Internship({internshipName, title, deadline, description, location, stipend, duration, eligibility, skills, type, companyName, companyEmail, companyPhone, companyAddress, companyWebsite });
        await newInternship.save();
        res.status(201).json({ message: 'Internship created successfully', internship: newInternship });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


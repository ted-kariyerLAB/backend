const Scholar = require('../models/Scholar');


exports.getAllScholar = async (req, res) => {
    try {
        const scholars = await Scholar.find();
        res.json(scholars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getScholarById = async (req, res) => {
    try {
        const scholar = await Scholar.findById(req.params.id);
        if (!scholar) return res.status(404).json({ message: 'Scholar not found' });
        res.json(scholar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createScholar = async (req, res) => {
    try {
        const { scholarName, title, deadline, description, type, organisationName, organisationEmail, organisationPhone, organisationAddress, organisationWebsite } = req.body;
        const newScholar = new Scholar({ scholarName, title, deadline, description, type, organisationName, organisationEmail, organisationPhone, organisationAddress, organisationWebsite});
        await newScholar.save();
        res.status(201).json({ message: 'Scholar created successfully', scholar: newScholar });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
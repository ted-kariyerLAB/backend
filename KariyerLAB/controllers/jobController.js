const Job = require('../models/Job');

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createJob = async (req, res) => {
    try {
        const { companyName, title, deadline, description,type } = req.body;
        const newJob = new Job({ companyName, title, deadline, description, type });
        await newJob.save();
        res.status(201).json({ message: 'Job created successfully', job: newJob });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


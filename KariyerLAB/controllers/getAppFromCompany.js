const Job = require('../models/Job');
const Intern = require('../models/Internship');
const Scholar = require('../models/Scholar');
const Application = require('../models/Application');

const getAllApplicationsForCompany = async (req, res) => {
    try {
      const companyName = req.params.companyName;
  
      const applications = await Application.find({ companyName });
  
      res.status(200).json(applications);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };
  
  module.exports = { getAllApplicationsForCompany };

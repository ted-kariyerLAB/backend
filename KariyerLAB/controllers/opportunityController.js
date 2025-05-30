const Opportunity = require('../models/Opportunity');

exports.createOpportunity = async (req, res) => {
  try {
    const { title, description, type , companyName } = req.body;

    if (!title || !description || !type || !companyName) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newOpportunity = new Opportunity({ title, description, type, companyName });
    await newOpportunity.save();

    res.status(201).json({ message: 'Opportunity created successfully', opportunity: newOpportunity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().sort({ createdAt: -1 });
    res.status(200).json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOpportunityByCompanyName = async (req, res) => {
  try {
    const companyName = req.params.companyName;
    const opportunity = await Opportunity.find({ companyName });

    if (!opportunity || opportunity.length === 0) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    res.status(200).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// İlan silme fonksiyonu
exports.deleteOpportunityById = async (req, res) => {
  try {
      const { id } = req.params;
      // İlanı sil
      const deletedOpportunity = await Opportunity.findByIdAndDelete(id);

      if (!deletedOpportunity) {  
        return res.status(404).json({ message: 'Opportunity not found' });
      }

      res.status(200).json({ message: 'Opportunity deleted successfully' });
      } catch (error) {
      res.status(500).json({ message: error.message });
      }
};
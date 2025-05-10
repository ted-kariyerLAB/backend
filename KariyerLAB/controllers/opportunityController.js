const Opportunity = require('../models/Opportunity');

exports.createOpportunity = async (req, res) => {
  try {
    const { title, description, type } = req.body;

    if (!title || !description || !type ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newOpportunity = new Opportunity({ title, description, type  });
    await newOpportunity.save();

    res.status(201).json({ message: 'Opportunity created successfully', opportunity: newOpportunity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

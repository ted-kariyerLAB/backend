const Application = require('../models/Application');

// Başvuru oluşturma (POST /api/application/apply)
exports.createApplication = async (req, res) => {
  try {
    const {
      fullName,
      nationalId,
      birthDate,
      birthPlace,
      companyName,
      contact,
      education,
      opportunityType,
      opportunityId,
      extra
    } = req.body;

    const newApplication = new Application({
      fullName,
      nationalId,
      birthDate,
      birthPlace,
      companyName,
      contact,
      education,
      opportunityType,
      opportunityId,
      extra
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
  } catch (error) {
    console.error('Application creation error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Tüm başvuruları getir (GET /api/application)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tek bir başvuruyu ID ile getir (GET /api/application/:id)
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Belirli bir ilana yapılan başvuruları getir (GET /api/application/opportunity/:type/:id)
exports.getApplicationsByOpportunity = async (req, res) => {
  try {
    const { type, id } = req.params;
    const applications = await Application.find({
      opportunityType: type,
      opportunityId: id
    });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

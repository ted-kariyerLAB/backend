const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');

exports.applyToOpportunity = async (req, res) => {
  try {
    const {
      fullName,
      email,
      experience,
      salaryExpectation,
      opportunityId
    } = req.body;

    // İlanı veritabanından bul
    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Temel alanlar kontrolü
    if (!fullName || !email || !opportunityId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Başvuru nesnesini oluştur
    const applicationData = {
      fullName,
      email,
      experience,
      opportunityId,
      opportunityType: opportunity.type
    };

    // İş yada staj ilanıysa maaş beklentisini ekle
    if (opportunity.type === 'job'|| opportunity.type === 'intern') {
      applicationData.salaryExpectation = salaryExpectation || '';
    }


    const application = new Application(applicationData);

    // Aynı ilana başvuru yapılmış mı kontrol et
    const existingApplication = await Application.findOne({
      email,
      opportunityId
    });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied to this opportunity' });
    }
    // Başvuru kaydını veritabanına ekle
    await application.save();


    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    console.error('Application error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getApplicationsByCompanyName = async (req, res) => {
  try {
    const companyName = req.params.companyName;

    // 1. Önce bu şirkete ait tüm ilanları bul
    const opportunities = await Opportunity.find({ companyName });

    if (!opportunities || opportunities.length === 0) {
      return res.status(404).json({ message: 'No opportunities found for this company.' });
    }

    const opportunityIds = opportunities.map(op => op._id); // sadece ID'leri al

    // 2. Bu ilanlara yapılmış başvuruları getir
    const applications = await Application.find({ opportunityId: { $in: opportunityIds } });

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for this company.' });
    }

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Öğrencinin başvuru yaptığı ilanları getir (opportunity detaylarını)
exports.getApplicationsByStudentEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Öğrenci e-mail'ine göre başvuruları getir
    const applications = await Application.find({ email });

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for this email' });
    }

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOpportunitiesByStudentEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // 1. Öğrencinin başvurularını al
    const applications = await Application.find({ email });

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: 'Bu e-mail ile başvuru bulunamadı.' });
    }

    // 2. Başvurulardaki ilan ID'lerini al
    const opportunityIds = applications.map(app => app.opportunityId);

    // 3. Bu ilanları veritabanından çek
    const opportunities = await Opportunity.find({ _id: { $in: opportunityIds } });

    // 4. Her ilanla başvuruyu birleştir (eşleştir)
    const combined = applications.map(app => {
      const opportunity = opportunities.find(o => o._id.toString() === app.opportunityId.toString());
      return {
        applicationId: app._id,
        fullName: app.fullName,
        email: app.email,
        experience: app.experience,
        salaryExpectation: app.salaryExpectation,
        status: app.status,
        rejectionMessage: app.rejectionMessage,
        opportunity: opportunity || null
      };
    });

    res.status(200).json(combined);
  } catch (error) {
    console.error('Başvuru listeleme hatası:', error);
    res.status(500).json({ message: error.message });
  }
};


exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params; // başvuru ID
    const { status, rejectionMessage } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updateData = { status };
    if (status === 'rejected') {
      updateData.rejectionMessage = rejectionMessage || '';
    }

    const updated = await Application.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({ message: 'Application updated', application: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*exports.getApplicationsWithOpportunityByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const applications = await Application.find({ email }).populate('opportunityId');

    const result = applications.map(app => ({
      applicationId: app._id,
      fullName: app.fullName,
      email: app.email,
      experience: app.experience,
      salaryExpectation: app.salaryExpectation,
      status: app.status,
      rejectionMessage: app.rejectionMessage,
      opportunity: {
        id: app.opportunityId._id,
        title: app.opportunityId.title,
        description: app.opportunityId.description,
        type: app.opportunityId.type,
        companyName: app.opportunityId.companyName
      },
      createdAt: app.createdAt
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error('Başvuru listeleme hatası:', error);
    res.status(500).json({ message: 'Bir hata oluştu' });
  }
};*/



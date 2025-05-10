const express = require('express');
const router = express.Router();
const {
  createApplication,
  getAllApplications,
  getApplicationById,
  getApplicationsByOpportunity,
} = require('../controllers/applicationController');

const { getAllApplicationsForCompany } = require('../controllers/getAppFromCompany');

// Başvuru oluştur
router.post('/create/apply', createApplication);

// Tüm başvuruları getir
router.get('/getAllApply', getAllApplications);

// ID ile başvuru getir
router.get('getApply/:id', getApplicationById);

// Belirli ilana yapılan başvurular
router.get('/opportunity/:type/:id', getApplicationsByOpportunity);

// Şirket adına göre başvuruları getir
router.get('/applications/company/:companyName', getAllApplicationsForCompany);

module.exports = router;

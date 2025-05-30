const express = require('express');
const router = express.Router();
const { applyToOpportunity , getApplicationsByCompanyName , getApplicationsByStudentEmail, getOpportunitiesByStudentEmail,updateApplicationStatus } = require('../controllers/applicationController');


router.post('/apply', applyToOpportunity);
router.get('/company/:companyName', getApplicationsByCompanyName); 
// Öğrenci e-mail'ine göre başvuruları getir (Application kayıtları)
router.get('/student/:email', getApplicationsByStudentEmail);
// Öğrenci e-mail'ine göre başvuru yaptığı ilanları getir (Opportunity kayıtları)
router.get('/student/:email/opportunities', getOpportunitiesByStudentEmail);

router.patch('/:id/status', updateApplicationStatus); // PATCH: Başvuru durum güncelle

module.exports = router;

const express = require('express');
const router = express.Router();
const { getAllInternship, getInternshipById, createInternship } = require('../controllers/internshipController');

router.post('/create/internship', createInternship);
router.get('/getAll/internship', getAllInternship);
router.get('/get/internship/:id', getInternshipById);

module.exports = router;
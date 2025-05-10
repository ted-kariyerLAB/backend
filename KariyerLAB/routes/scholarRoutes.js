const express = require('express');
const router = express.Router();
const { getAllScholar, getScholarById, createScholar } = require('../controllers/scholarController');

router.post('/create/scholar', createScholar);
router.get('/getAll/scholar', getAllScholar);
router.get('/get/scholar/:id', getScholarById);

module.exports = router;

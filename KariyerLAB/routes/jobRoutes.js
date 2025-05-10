const express = require('express');
const router = express.Router();
const { getAllJobs, getJobById,createJob } = require('../controllers/jobController');

router.post('/create/job', createJob);
router.get('/getAll/job', getAllJobs);
router.get('/get/job/:id', getJobById);

module.exports = router;

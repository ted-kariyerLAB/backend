const express = require('express');
const router = express.Router();
const { createOpportunity } = require('../controllers/opportunityController');
const { getAllOpportunities } = require('../controllers/opportunityController');
const { getOpportunityByCompanyName } = require('../controllers/opportunityController');


router.post('/create/opportunity', createOpportunity); // POST /api/opportunity/create
router.get('/all', getAllOpportunities); // GET /api/opportunity/all
router.get('/:companyName', getOpportunityByCompanyName); // GET /api/opportunity/:companyName

module.exports = router;

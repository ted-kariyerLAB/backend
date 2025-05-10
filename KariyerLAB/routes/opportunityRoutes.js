const express = require('express');
const router = express.Router();
const { createOpportunity } = require('../controllers/opportunityController');

router.post('/create/opportunity', createOpportunity); // POST /api/opportunity/create

module.exports = router;

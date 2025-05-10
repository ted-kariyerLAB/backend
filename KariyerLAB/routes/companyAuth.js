const express = require('express');
const router = express.Router();
const { register, login , getCompanyByName } = require('../controllers/companyController');

router.post('/register', register);
router.post('/login', login);
router.get('/getByName/:companyName', getCompanyByName);

module.exports = router;

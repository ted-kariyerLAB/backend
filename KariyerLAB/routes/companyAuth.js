const express = require('express');
const router = express.Router();
const { register, login , getCompanyByName , companyReview , updatePhoto } = require('../controllers/companyController');
const upload = require('../config/multerCompany');

router.post('/register', register);
router.post('/login', login);
router.get('/getByName/:companyName', getCompanyByName);
router.get('/getByName', getCompanyByName); 
router.post('/company/review', companyReview ); // Şirket puanlama endpoint'i
router.put('/photo/:email', upload.single('photo'), updatePhoto);

module.exports = router;

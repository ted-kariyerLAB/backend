const express = require('express');
const router = express.Router();
const { register, login , getStudentByEmail,updateStudentInfo} = require('../controllers/studentController');
const upload = require('../config/multer');
const { updatePhoto } = require('../controllers/studentController');

router.post('/register', upload.single('photo'), register);
router.post('/login', login);
router.get('/email/:email', getStudentByEmail);  
router.put('/photo/:email', upload.single('photo'), updatePhoto);
router.put('/update/:email', updateStudentInfo);


module.exports = router;

const express = require('express');
const router = express.Router();
const { register, login , getStudentByEmail} = require('../controllers/studentController');
const upload = require('../config/multer');
const { updatePhoto } = require('../controllers/studentController');

router.post('/register', upload.single('photo'), register);
router.post('/login', login);
router.get('/email/:email', getStudentByEmail);  
router.put('/photo/:email', upload.single('photo'), updatePhoto);


module.exports = router;

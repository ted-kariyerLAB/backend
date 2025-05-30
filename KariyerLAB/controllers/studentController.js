const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => { 
    const { email, password,name,surname,phone,university,department} = req.body;

    try {
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) return res.status(400).json({ message: 'Student already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        // Validate the additional fields
        if (!name || !surname || !phone || !university || !department) {
            return res.status(400).json({ message: 'All fields are required' });
        }       
        // Check if the phone number is valid (example: 10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: 'Invalid phone number' });
        }
        // Check if the university and department are valid (example: non-empty strings)
        if (university.trim() === '' || department.trim() === '') {
            return res.status(400).json({ message: 'University and department cannot be empty' });
        }
        // Check if the email is valid (example: simple regex for email format)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {  
            return res.status(400).json({ message: 'Invalid email format' });
        }
        // Check if the password is strong (example: at least 6 characters)
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }   
        // Check if the name and surname are valid (example: non-empty strings)
        if (name.trim() === '' || surname.trim() === '') {
            return res.status(400).json({ message: 'Name and surname cannot be empty' });
        }   
        // Create a new student instance with the additional fields
        const student = new Student({ email, password: hashedPassword, name, surname, phone, university, department, 
             photo: req.file ? req.file.filename : null,
         });
        await student.save();

        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student.findOne({ email });
        if (!student) return res.status(200).json({ success: false, message: 'Student not found' });
        
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(200).json({ success: false, message: 'Invalid credentials' });

        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ success: true, token, message: 'Login successful' });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getStudentByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const student = await Student.findOne({ email }).select('-password');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const studentData = student.toObject();
        if (studentData.photo) {
            studentData.photoUrl = `${req.protocol}://${req.get('host')}/uploads/studentPhotos/${studentData.photo}`;
        }

        res.status(200).json(studentData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePhoto = async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            { email: req.params.email },
            { photo: req.file ? req.file.filename : null },
            { new: true }
        );
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
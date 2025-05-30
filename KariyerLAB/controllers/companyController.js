const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password,companyName,companyAddress,companyPhone,companySector } = req.body;

    try {
        const existingCompany = await Company.findOne({ email });
        if (existingCompany) return res.status(400).json({ message: 'Company already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        // Validate the additional fields
        if (!companyName || !companyAddress || !companyPhone || !companySector) {
            return res.status(400).json({ message: 'All fields are required' });
        }   
        // Check if the phone number is valid (example: 10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(companyPhone)) {
            return res.status(400).json({ message: 'Invalid phone number' });
        }
        // Check if the company name and address are valid (example: non-empty strings)
        if (companyName.trim() === '' || companyAddress.trim() === '') {
            return res.status(400).json({ message: 'Company name and address cannot be empty' });
        }
        // Check if the email is valid (example: simple regex for email format)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {  
            return res.status(400).json({ message: 'Invalid email format' });
        }
        // Create a new company instance with the additional fields
        const company = new Company({ email, password: hashedPassword, companyName, companyAddress, companyPhone, companySector });
        await company.save();

        res.status(201).json({ message: 'Company registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const company = await Company.findOne({ email });
        if (!company) return res.status(400).json({ message: 'Company not found' });

        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, message: " Company login succesfull" , success: true, companyName: company.companyName });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Şirket bilgilerini companyName'e göre getir
exports.getCompanyByName = async (req, res) => {
    try {
        const companyName = req.params.companyName;

        if (!companyName) {
        // Parametre yoksa tüm şirketleri getir
        const companies = await Company.find().select('-password');
        return res.status(200).json(companies);
        }    

        const company = await Company.findOne({ companyName }).select('-password');
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const companyData = company.toObject();
        if (companyData.photo) {
            companyData.photoUrl = `${req.protocol}://${req.get('host')}/uploads/companyPhotos/${companyData.photo}`;
        }

        res.status(200).json(companyData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.companyReview = async (req, res) => {
    const { companyName, studentEmail, rating, comment, statusGiven } = req.body;

    try {
        const company = await Company.findOne({ companyName });
        if (!company) return res.status(404).json({ message: 'Company not found' });

        if (rating < 1 || rating > 5) return res.status(400).json({ message: 'Rating must be between 1 and 5' });

        if (!['accepted', 'rejected'].includes(statusGiven)) {
            return res.status(400).json({ message: 'Invalid status given' });
        }

        // Aynı öğrenci aynı şirkete bir kez değerlendirme yapabilsin
        const existingReview = company.reviews.find(r => r.studentEmail === studentEmail);
        if (existingReview) return res.status(400).json({ message: 'You have already reviewed this company' });

        company.reviews.push({ studentEmail, rating, comment, statusGiven });
        
        // Ortalamayı güncelle (tüm değerlendirmelerin ortalaması)
        const totalRating = company.reviews.reduce((acc, r) => acc + r.rating, 0);
        company.companyRating = (totalRating / company.reviews.length).toFixed(1);

        await company.save();

        res.status(200).json({ message: 'Review added successfully', company});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePhoto = async (req, res) => {
    try {
        const company = await Company.findOneAndUpdate(
            { name: req.params.companyName },
            { photo: req.file ? req.file.filename : null },
            { new: true }
        );
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(company);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
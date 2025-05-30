const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const studentRoutes = require('./routes/studentAuth');
const companyRoutes = require('./routes/companyAuth');
const jobRoutes = require('./routes/jobRoutes'); 
const scholarRoutes = require('./routes/scholarRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/student', studentRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes); 
app.use('/api/scholar', scholarRoutes);
app.use('/api/internship', internshipRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/opportunity', opportunityRoutes);

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Sunucuyu başlat
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

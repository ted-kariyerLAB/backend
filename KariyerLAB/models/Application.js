const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  // Same fields as the User model
  fullName: { type: String, required: true },
  nationalId: { type: String, required: true },
  birthDate: { type: Date, required: true },
  birthPlace: { type: String, required: true },
  companyName: { type: String, required: true },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
  },

  education: {
    schoolName: { type: String, required: true },
    department: { type: String, required: true },
    grade: { type: String, required: true }, // 1st, 2nd, 3rd, 4th year
    graduationYear: { type: String },
    gpa: { type: String }
  },

  // Id and type of the opportunity being applied for
  opportunityType: { type: String, enum: ['job', 'intern', 'scholar'], required: true },
  opportunityId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'opportunityType' },

  // information about the opportunity
  extra: {
    // for job
    militaryStatus: { type: String }, // Yapıldı / Tecilli / Muaf
    travelAvailability: { type: Boolean }, // true / false

    // for internship
    insuranceBySchool: { type: Boolean }, // true / false

    // for scholarship
    familyIncome: { type: String },
    familySize: { type: Number }
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);

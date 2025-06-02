const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  maritalStatus: String,
  bloodType: String,
  phone: String,
  email: String,
  residence: String,
  address: String,

  emergencyContact: {
    name: String,
    phone: String,
    relationship: String,
  },

  patientType: {
    type: String,
    enum: ["In-Patient", "Out-Patient"],
    required: true,
  },

  insurance: {
    provider: String,
    insuranceNumber: String,
    paymentMethod: {
      type: String,
      enum: ["Insurance", "Cash", "NHIF", "Mobile Money", "Other"],
    },
  },

  photo: {
    type: String, // URL or base64
    default: null,
  },

  lastVisit: {
    type: Date,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

patientSchema.virtual("age").get(function () {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

module.exports = mongoose.model("Patient", patientSchema);

const mongoose = require("mongoose");

const receptionistSchema = new mongoose.Schema({
  receptionistId: { type: String, unique: true },
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  gender: String,
  address: String,
  nationalId: String,
  dateOfBirth: Date,
  joinedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Receptionist", receptionistSchema);

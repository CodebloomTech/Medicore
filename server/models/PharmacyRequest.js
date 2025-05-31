// models/PharmacyRequest.js
const mongoose = require("mongoose");

const pharmacyRequestSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
  dosage: String,
  frequency: String, // e.g., "Twice a day"
  duration: String, // e.g., "5 days"
  notes: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["Pending", "Fulfilled"], default: "Pending" },
});

module.exports = mongoose.model("PharmacyRequest", pharmacyRequestSchema);

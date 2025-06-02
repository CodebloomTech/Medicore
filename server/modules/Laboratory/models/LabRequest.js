// models/LabRequest.js
const mongoose = require("mongoose");

const LabRequestSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "LabTest" }],
  requestDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed", "Cancelled"],
    default: "Pending",
  },
  notes: { type: String },
});

module.exports = mongoose.model("LabRequest", LabRequestSchema);

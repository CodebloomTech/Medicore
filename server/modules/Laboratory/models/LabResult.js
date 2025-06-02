// models/LabResult.js
const mongoose = require("mongoose");

const LabResultSchema = new mongoose.Schema({
  labRequestId: { type: mongoose.Schema.Types.ObjectId, ref: "LabRequest", required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "LabTest", required: true },
  result: { type: String, required: true },
  unit: { type: String },
  referenceRange: { type: String },
  resultDate: { type: Date, default: Date.now },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }, // or LabTechnician
  status: {
    type: String,
    enum: ["Normal", "Abnormal", "Critical"],
    default: "Normal",
  },
  remarks: { type: String },
});

module.exports = mongoose.model("LabResult", LabResultSchema);

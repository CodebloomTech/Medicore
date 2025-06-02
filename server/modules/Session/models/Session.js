const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
  },
  sessionType: {
    type: String,
    enum: ["Consultation", "Emergency", "Follow-up", "Check-up"],
    required: true,
  },
  visitReason: {
    type: String,
  },
  triage: {
    temperature: String,
    bloodPressure: String,
    pulse: String,
    weight: String,
    height: String,
    notes: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Ongoing", "Completed"],
    default: "Pending",
  },
  sessionDate: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Session", sessionSchema);
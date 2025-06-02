// routes/patientRoutes.js
const express = require("express");
const router = express.Router();
const Patient = require("../../Patient/models/Patient");
const { authenticateToken } = require("../../../middleware/authMiddleware");

// Helper: Generate a unique patient ID like PAT/001/25
const getNextPatientId = async () => {
  const lastPatient = await Patient.findOne().sort({ createdAt: -1 });
  const currentYear = new Date().getFullYear().toString().slice(-2); // e.g., '25'
  let nextIdNumber = 1;

  if (lastPatient && lastPatient.patientId) {
    const parts = lastPatient.patientId.split("/");
    const lastYear = parts[2];
    const lastNumber = parseInt(parts[1]);

    if (lastYear === currentYear) {
      nextIdNumber = lastNumber + 1;
    }
  }

  const formattedNumber = String(nextIdNumber).padStart(3, "0");
  return `PAT/${formattedNumber}/${currentYear}`;
};

// 📌 CREATE a new patient
router.post("/", authenticateToken, async (req, res) => {
  try {
    const patientId = await getNextPatientId();
    const newPatient = new Patient({ ...req.body, patientId });
    const saved = await newPatient.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📋 READ all patients
router.get("/", authenticateToken, async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔍 READ a patient by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ UPDATE a patient by ID
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Patient not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🗑️ DELETE a patient by ID
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Patient not found" });
    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

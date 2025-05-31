const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const { authenticateToken } = require("../middleware/authMiddleware");
// Patient Routes
// This file handles all patient-related routes, including CRUD operations

// Helper to auto-generate patient ID
const getNextPatientId = async () => {
  const lastPatient = await Patient.findOne().sort({ createdAt: -1 });
  const currentYear = new Date().getFullYear().toString().slice(-2); // e.g. '25'
  let nextIdNumber = 1;

  if (lastPatient && lastPatient.patientId) {
    const parts = lastPatient.patientId.split("/");
    const lastYear = parts[2];
    const lastNumber = parseInt(parts[1]);

    if (lastYear === currentYear) {
      nextIdNumber = lastNumber + 1;
    }
  }

  const formattedNumber = String(nextIdNumber).padStart(3, "0"); // 001, 002, etc.
  return `PAT/${formattedNumber}/${currentYear}`;
};

// POST: Add a new patient (Protected)
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

// GET: Get all patients (Protected)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Get a patient by ID (Protected)
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

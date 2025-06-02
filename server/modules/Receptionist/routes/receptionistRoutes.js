const express = require("express");
const router = express.Router();
const Receptionist = require("../models/Receptionist");
const { authenticateToken } = require("../middleware/authMiddleware");

// Helper: Auto-generate Receptionist ID
const generateReceptionistId = async () => {
  const currentYear = new Date().getFullYear().toString().slice(-2); // '25'
  const last = await Receptionist.findOne().sort({ createdAt: -1 });

  let nextNumber = 1;

  if (last && last.receptionistId) {
    const parts = last.receptionistId.split("/");
    const lastYear = parts[2];
    const lastNum = parseInt(parts[1]);

    if (lastYear === currentYear) {
      nextNumber = lastNum + 1;
    }
  }

  const padded = String(nextNumber).padStart(3, "0");
  return `REC/${padded}/${currentYear}`;
};

// POST: Create a receptionist
router.post("/", authenticateToken, async (req, res) => {
  try {
    const receptionistId = await generateReceptionistId();
    const newReceptionist = new Receptionist({ ...req.body, receptionistId });
    const saved = await newReceptionist.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: All receptionists
router.get("/", authenticateToken, async (req, res) => {
  try {
    const all = await Receptionist.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Single receptionist
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const found = await Receptionist.findById(req.params.id);
    if (!found) return res.status(404).json({ message: "Not found" });
    res.json(found);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Update receptionist
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const updated = await Receptionist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Remove receptionist
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await Receptionist.findByIdAndDelete(req.params.id);
    res.json({ message: "Receptionist removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

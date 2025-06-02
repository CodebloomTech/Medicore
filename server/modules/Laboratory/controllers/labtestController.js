// controllers/labTestController.js
const LabTest = require("../models/LabTest");

exports.createLabTest = async (req, res) => {
  try {
    const newTest = new LabTest(req.body);
    const saved = await newTest.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllLabTests = async (req, res) => {
  try {
    const tests = await LabTest.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLabTestById = async (req, res) => {
  try {
    const test = await LabTest.findById(req.params.id);
    if (!test) return res.status(404).json({ error: "Test not found" });
    res.json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

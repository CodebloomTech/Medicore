const LabResult = require("../models/LabResult");
const LabOrder = require("../models/LabOrder");

const createLabResult = async (req, res) => {
  try {
    const { labOrder, testResults, recordedBy, notes } = req.body;

    // Optional: Check if order exists
    const existingOrder = await LabOrder.findById(labOrder);
    if (!existingOrder) return res.status(404).json({ error: "Lab order not found" });

    // Optional: Prevent duplicate results
    const existingResult = await LabResult.findOne({ labOrder });
    if (existingResult)
      return res.status(400).json({ error: "Result for this order already exists" });

    const newResult = new LabResult({
      labOrder,
      testResults,
      recordedBy,
      notes,
    });

    const saved = await newResult.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getLabResults = async (req, res) => {
  try {
    const results = await LabResult.find()
      .populate("labOrder")
      .populate("testResults.test", "name category")
      .populate("recordedBy", "fullName");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLabResultByOrder = async (req, res) => {
  try {
    const result = await LabResult.findOne({ labOrder: req.params.orderId })
      .populate("labOrder")
      .populate("testResults.test")
      .populate("recordedBy");

    if (!result) return res.status(404).json({ message: "Result not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createLabResult,
  getLabResults,
  getLabResultByOrder,
};

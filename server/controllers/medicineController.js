const Medicine = require("../models/Medicine");

exports.createMedicine = async (req, res) => {
  try {
    const med = new Medicine(req.body);
    await med.save();
    res.status(201).json(med);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllMedicines = async (req, res) => {
  try {
    const meds = await Medicine.find();
    res.status(200).json(meds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMedicineById = async (req, res) => {
  try {
    const med = await Medicine.findById(req.params.id);
    if (!med) return res.status(404).json({ message: "Medicine not found" });
    res.status(200).json(med);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMedicine = async (req, res) => {
  try {
    const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Medicine not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMedicine = async (req, res) => {
  try {
    const deleted = await Medicine.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Medicine not found" });
    res.status(200).json({ message: "Medicine deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

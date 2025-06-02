const Receptionist = require("../models/receptionistModel");

// Create a new receptionist
const createReceptionist = async (req, res) => {
  try {
    const receptionist = new Receptionist(req.body);
    await receptionist.save();
    res.status(201).json(receptionist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all receptionists
const getAllReceptionists = async (req, res) => {
  try {
    const receptionists = await Receptionist.find();
    res.status(200).json(receptionists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single receptionist by ID
const getReceptionistById = async (req, res) => {
  try {
    const receptionist = await Receptionist.findById(req.params.id);
    if (!receptionist) {
      return res.status(404).json({ message: "Receptionist not found" });
    }
    res.status(200).json(receptionist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update receptionist
const updateReceptionist = async (req, res) => {
  try {
    const updated = await Receptionist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Receptionist not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete receptionist
const deleteReceptionist = async (req, res) => {
  try {
    const deleted = await Receptionist.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Receptionist not found" });
    }
    res.status(200).json({ message: "Receptionist deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReceptionist,
  getAllReceptionists,
  getReceptionistById,
  updateReceptionist,
  deleteReceptionist,
};

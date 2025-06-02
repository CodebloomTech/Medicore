// controllers/requisitionController.js
const Requisition = require("../models/MedicineRequisition");

exports.createRequisition = async (req, res) => {
  try {
    const requisition = new Requisition(req.body);
    await requisition.save();
    res.status(201).json(requisition);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllRequisitions = async (req, res) => {
  try {
    const requisitions = await Requisition.find().populate("medicines.medicine");
    res.status(200).json(requisitions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRequisitionStatus = async (req, res) => {
  try {
    const { status, approvedBy } = req.body;
    const updated = await Requisition.findByIdAndUpdate(
      req.params.id,
      {
        status,
        approvedBy,
        approvedAt: new Date(),
      },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


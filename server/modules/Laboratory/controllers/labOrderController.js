const LabOrder = require("../models/LabOrder");
const Patient = require("../../Patient/models/Patient");
const Doctor = require("../../../models/Doctor");

const createLabOrder = async (req, res) => {
  try {
    const { patient, doctor, testsRequested, notes } = req.body;

    const orderId = `LAB/${Date.now()}`;

    const newOrder = new LabOrder({
      orderId,
      patient,
      doctor,
      testsRequested,
      notes,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllLabOrders = async (req, res) => {
  try {
    const orders = await LabOrder.find()
      .populate("patient", "fullName patientId")
      .populate("doctor", "fullName department")
      .populate("testsRequested", "name category");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLabOrderById = async (req, res) => {
  try {
    const order = await LabOrder.findById(req.params.id)
      .populate("patient", "fullName")
      .populate("doctor", "fullName")
      .populate("testsRequested", "name");

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createLabOrder,
  getAllLabOrders,
  getLabOrderById,
};

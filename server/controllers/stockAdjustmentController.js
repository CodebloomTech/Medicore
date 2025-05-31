const StockAdjustment = require("../models/StockAdjustment");

exports.createAdjustment = async (req, res) => {
  try {
    const adj = new StockAdjustment(req.body);
    await adj.save();
    res.status(201).json(adj);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllAdjustments = async (req, res) => {
  try {
    const adjustments = await StockAdjustment.find().populate("medicine");
    res.status(200).json(adjustments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

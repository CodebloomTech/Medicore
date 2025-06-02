exports.createStockAdjustment = async (req, res) => {
  try {
    const adj = new StockAdjustment(req.body);
    await adj.save();
    res.status(201).json(adj);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllStockAdjustments = async (req, res) => {
  try {
    const adjustments = await StockAdjustment.find().populate("medicine");
    res.status(200).json(adjustments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStockAdjustmentById = async (req, res) => {
  try {
    const adj = await StockAdjustment.findById(req.params.id).populate("medicine");
    if (!adj) return res.status(404).json({ message: "Not found" });
    res.status(200).json(adj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStockAdjustment = async (req, res) => {
  try {
    const deleted = await StockAdjustment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

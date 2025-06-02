// models/StockAdjustment.js
const mongoose = require("mongoose");

const stockAdjustmentSchema = new mongoose.Schema({
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
  quantityChanged: { type: Number, required: true },
  reason: { type: String }, // e.g., "Expired", "Inventory correction"
  adjustedBy: { type: String },
  adjustedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("StockAdjustment", stockAdjustmentSchema);

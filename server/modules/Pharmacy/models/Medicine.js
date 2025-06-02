// models/Medicine.js
const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  description: String,
  dosageForm: String, // e.g., tablet, syrup, injection
  strength: String, // e.g., "500mg"
  quantityInStock: { type: Number, default: 0 },
  price: { type: Number, required: true },
  expiryDate: { type: Date },
  manufacturer: String,
  batchNumber: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Medicine", medicineSchema);

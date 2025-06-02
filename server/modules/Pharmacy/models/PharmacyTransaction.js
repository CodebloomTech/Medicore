// models/PharmacyTransaction.js
const mongoose = require("mongoose");

const pharmacyTransactionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number },
  issuedBy: { type: String }, // Name of pharmacist
  issuedAt: { type: Date, default: Date.now },
});

pharmacyTransactionSchema.pre("save", function (next) {
  this.totalPrice = this.quantity * this.price;
  next();
});

module.exports = mongoose.model("PharmacyTransaction", pharmacyTransactionSchema);

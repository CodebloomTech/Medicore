// models/MedicineRequisition.js
const mongoose = require("mongoose");

const medicineRequisitionSchema = new mongoose.Schema({
  requisitionId: {
    type: String,
    unique: true,
    default: () =>
      `REQ-${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(10 + Math.random() * 90)}`,
  },
  requestedBy: { type: String, required: true }, // Pharmacist name
  medicines: [
    {
      medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
      quantity: { type: Number, required: true },
      notes: String,
    },
  ],
  purpose: { type: String }, // e.g., "Low stock", "Emergency", etc.
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Fulfilled"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
  approvedBy: { type: String, default: null }, // Billing/procurement team
  approvedAt: { type: Date, default: null },
});

module.exports = mongoose.model("MedicineRequisition", medicineRequisitionSchema);

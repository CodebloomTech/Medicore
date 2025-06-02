const mongoose = require("mongoose");

const LabOrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    testsRequested: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestType", // Reference your test types
      },
    ],
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
    results: {
      type: String,
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: Date,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("LabOrder", LabOrderSchema);

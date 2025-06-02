// models/LabTest.js
const mongoose = require("mongoose");

const LabTestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
    },
    normalRange: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LabTest", LabTestSchema);

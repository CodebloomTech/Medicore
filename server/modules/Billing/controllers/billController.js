// controllers/billController.js
const Bill = require("../models/Bill");

// Generate next invoice number like INV-00001
const generateInvoiceNumber = async () => {
  const latest = await Bill.findOne().sort({ createdAt: -1 });
  const lastNumber = latest?.invoiceNumber?.split("-")[1];
  const nextNumber = lastNumber ? parseInt(lastNumber) + 1 : 1;
  return `INV-${String(nextNumber).padStart(5, "0")}`;
};

exports.createBill = async (req, res) => {
  try {
    const invoiceNumber = await generateInvoiceNumber();
    const bill = new Bill({
      ...req.body,
      invoiceNumber,
    });

    await bill.save();
    const populated = await Bill.findById(bill._id)
      .populate("patient", "name patientId")
      .populate("session");

    res.status(201).json(populated);
  } catch (error) {
    console.error("Error in createBill:", error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.getBills = async (req, res) => {
  try {
    const { patientId, startDate, endDate } = req.query;
    const query = {};

    if (patientId) query.patient = patientId;
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const bills = await Bill.find(query)
      .populate("patient", "name patientId")
      .populate("session");

    res.status(200).json(bills);
  } catch (error) {
    console.error("Error in getBills:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id)
      .populate("patient", "name patientId")
      .populate("session");

    if (!bill) return res.status(404).json({ message: "Bill not found" });

    res.status(200).json(bill);
  } catch (error) {
    console.error("Error in getBillById:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.updateBill = async (req, res) => {
  try {
    const updated = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Bill not found" });

    const populated = await Bill.findById(updated._id)
      .populate("patient", "name patientId")
      .populate("session");

    res.status(200).json(populated);
  } catch (error) {
    console.error("Error in updateBill:", error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBill = async (req, res) => {
  try {
    const deleted = await Bill.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Bill not found" });

    res.status(200).json({ message: "Bill deleted" });
  } catch (error) {
    console.error("Error in deleteBill:", error.message);
    res.status(500).json({ message: error.message });
  }
};

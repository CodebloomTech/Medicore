const PharmacyTransaction = require("../models/PharmacyTransaction");

// @desc    Create a new pharmacy transaction
// @route   POST /api/pharmacy-transactions
// @access  Protected
exports.createTransaction = async (req, res) => {
  try {
    const transaction = new PharmacyTransaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to create transaction" });
  }
};

// @desc    Get all pharmacy transactions
// @route   GET /api/pharmacy-transactions
// @access  Protected
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await PharmacyTransaction.find().populate("patient medicine");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch transactions" });
  }
};

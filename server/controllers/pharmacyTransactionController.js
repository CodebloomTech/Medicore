const PharmacyTransaction = require("../models/PharmacyTransaction");

exports.createTransaction = async (req, res) => {
  try {
    const tx = new PharmacyTransaction(req.body);
    await tx.save();
    res.status(201).json(tx);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const txs = await PharmacyTransaction.find().populate("patient medicine");
    res.status(200).json(txs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const express = require("express");
const router = express.Router();
const pharmacyTransactionController = require("../controllers/pharmacyTransactionController");
const { authenticateToken } = require("../../../middleware/authMiddleware");

router.post("/", authenticateToken, pharmacyTransactionController.createTransaction);
router.get("/", authenticateToken, pharmacyTransactionController.getAllTransactions);

module.exports = router;

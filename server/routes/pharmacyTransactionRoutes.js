const express = require("express");
const router = express.Router();
const pharmacyTransactionController = require("../controllers/pharmacyTransactionController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/", authenticateToken, pharmacyTransactionController.createTransaction);
router.get("/", authenticateToken, pharmacyTransactionController.getAllTransactions);
router.get("/:id", authenticateToken, pharmacyTransactionController.getTransactionById);
router.delete("/:id", authenticateToken, pharmacyTransactionController.deleteTransaction);

module.exports = router;

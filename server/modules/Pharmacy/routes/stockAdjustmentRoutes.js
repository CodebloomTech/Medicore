const express = require("express");
const router = express.Router();
const stockAdjustmentController = require("../controllers/stockAdjustmentController");
const { authenticateToken } = require("../../../middleware/authMiddleware");

router.post("/", authenticateToken, stockAdjustmentController.createStockAdjustment);
router.get("/", authenticateToken, stockAdjustmentController.getAllStockAdjustments);
router.get("/:id", authenticateToken, stockAdjustmentController.getStockAdjustmentById);
router.delete("/:id", authenticateToken, stockAdjustmentController.deleteStockAdjustment);

module.exports = router;

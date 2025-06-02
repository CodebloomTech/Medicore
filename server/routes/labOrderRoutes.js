const express = require("express");
const router = express.Router();
const {
  createLabOrder,
  getAllLabOrders,
  getLabOrderById,
} = require("../modules/Laboratory/controllers/labOrderController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/", authenticateToken, createLabOrder);
router.get("/", authenticateToken, getAllLabOrders);
router.get("/:id", authenticateToken, getLabOrderById);

module.exports = router;

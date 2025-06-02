const express = require("express");
const router = express.Router();
const {
  createLabResult,
  getLabResults,
  getLabResultByOrder,
} = require("../modules/Laboratory/controllers/labResultController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/", authenticateToken, createLabResult);
router.get("/", authenticateToken, getLabResults);
router.get("/:orderId", authenticateToken, getLabResultByOrder);

module.exports = router;

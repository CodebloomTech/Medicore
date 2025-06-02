// routes/requisitionRoutes.js
const express = require("express");
const router = express.Router();
const {
  createRequisition,
  getAllRequisitions,
  updateRequisitionStatus,
} = require("../controllers/requisitionController");

const { authenticateToken } = require("../../../middleware/authMiddleware");

router.post("/", authenticateToken, createRequisition);
router.get("/", authenticateToken, getAllRequisitions);
router.put("/:id/status", authenticateToken, updateRequisitionStatus);

module.exports = router;

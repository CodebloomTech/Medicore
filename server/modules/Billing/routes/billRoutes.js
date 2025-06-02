const express = require("express");
const router = express.Router();
const billController = require("../../../controllers/billController");
const { authenticateToken } = require("../../../middleware/authMiddleware"); // Correct import

router.use(authenticateToken); // Apply middleware to all routes

router.post("/", billController.createBill);
router.get("/", billController.getBills);
router.get("/:id", billController.getBillById);
router.put("/:id", billController.updateBill);
router.delete("/:id", billController.deleteBill);

module.exports = router;

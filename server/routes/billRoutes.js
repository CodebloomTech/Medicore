// routes/billRoutes.js
const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");
const { authenticateToken } = require("../middleware/authMiddleware"); // ✅ Destructure the function

router.use(authenticateToken); // ✅ Apply to all routes in this router

router.post("/", billController.createBill);
router.get("/", billController.getBills);
router.get("/:id", billController.getBillById);
router.put("/:id", billController.updateBill);
router.delete("/:id", billController.deleteBill);

module.exports = router;

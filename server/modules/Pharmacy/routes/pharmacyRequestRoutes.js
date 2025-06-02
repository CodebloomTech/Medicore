const express = require("express");
const router = express.Router();
const pharmacyRequestController = require("../controllers/pharmacyRequestController");
const { authenticateToken } = require("../../../middleware/authMiddleware");

router.post("/", authenticateToken, pharmacyRequestController.createRequest);
router.get("/", authenticateToken, pharmacyRequestController.getAllRequests);
router.get("/:id", authenticateToken, pharmacyRequestController.getRequestById);
router.put("/:id", authenticateToken, pharmacyRequestController.updateRequestStatus);


module.exports = router;

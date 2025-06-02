const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicineController");
const { authenticateToken } = require("../../../middleware/authMiddleware");

router.post("/", authenticateToken, medicineController.createMedicine);
router.get("/", authenticateToken, medicineController.getAllMedicines);
router.get("/:id", authenticateToken, medicineController.getMedicineById);
router.put("/:id", authenticateToken, medicineController.updateMedicine);
router.delete("/:id", authenticateToken, medicineController.deleteMedicine);

module.exports = router;

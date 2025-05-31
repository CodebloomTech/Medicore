const express = require("express");
const router = express.Router();

const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

const { authenticateToken } = require("../middleware/authMiddleware");

// Protect all routes
router.post("/", authenticateToken, createDoctor);
router.get("/", authenticateToken, getAllDoctors);
router.get("/:id", authenticateToken, getDoctorById);
router.put("/:id", authenticateToken, updateDoctor);
router.delete("/:id", authenticateToken, deleteDoctor);

module.exports = router;

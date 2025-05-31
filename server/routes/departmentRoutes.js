const express = require("express");
const router = express.Router();

const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const { authenticateToken } = require("../middleware/authMiddleware");

// POST: Create new department (Protected)
router.post("/", authenticateToken, createDepartment);

// GET: Get all departments (Protected)
router.get("/", authenticateToken, getAllDepartments);

// GET: Get a single department by ID (Protected)
router.get("/:id", authenticateToken, getDepartmentById);

// PUT: Update department (Protected)
router.put("/:id", authenticateToken, updateDepartment);

// DELETE: Delete department (Protected)
router.delete("/:id", authenticateToken, deleteDepartment);

module.exports = router;

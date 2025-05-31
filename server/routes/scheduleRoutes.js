// routes/scheduleRoutes.js
const express = require("express");
const router = express.Router();

const {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");

const { authenticateToken } = require("../middleware/authMiddleware");

// POST: Create a new schedule (Protected)
router.post("/", authenticateToken, createSchedule);

// GET: Get all schedules (Protected)
router.get("/", authenticateToken, getSchedules);

// GET: Get schedule by ID (Protected)
router.get("/:id", authenticateToken, getScheduleById);

// PUT: Update schedule (Protected)
router.put("/:id", authenticateToken, updateSchedule);

// DELETE: Delete schedule (Protected)
router.delete("/:id", authenticateToken, deleteSchedule);

module.exports = router;

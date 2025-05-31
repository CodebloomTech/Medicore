const express = require("express");
const router = express.Router();
const {
  createSession,
  getAllSessions,
  getSessionById,
  deleteSession,
} = require("../controllers/sessionController");

const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/", authenticateToken, createSession);
router.get("/", authenticateToken, getAllSessions);
router.get("/:id", authenticateToken, getSessionById);
router.delete("/:id", authenticateToken, deleteSession);

module.exports = router;

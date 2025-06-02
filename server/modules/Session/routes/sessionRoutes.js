const express = require("express");
const router = express.Router();

const {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
} = require("../controllers/sessionController");

const { authenticateToken } = require("../../../middleware/authMiddleware");

router.post("/", authenticateToken, createSession);
router.get("/", authenticateToken, getAllSessions);
router.get("/:id", authenticateToken, getSessionById);
router.put("/:id", authenticateToken, updateSession);
router.delete("/:id", authenticateToken, deleteSession);

module.exports = router;

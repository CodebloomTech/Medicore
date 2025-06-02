// routes/labTestRoutes.js
const express = require("express");
const router = express.Router();
const labTestController = require("../modules/Laboratory/controllers/labtestController");

// Add test type
router.post("/", labTestController.createLabTest);

// List all test types
router.get("/", labTestController.getAllLabTests);

// Get single test by ID
router.get("/:id", labTestController.getLabTestById);

module.exports = router;

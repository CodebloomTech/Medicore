const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chalk = require("chalk");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
app.use(express.json());

// Custom logger utilities
const connectDB = require("./config/db");
const {
  logBanner,
  startSpinner,
  stopSpinnerSuccess,
  stopSpinnerFail,
  logError,
  logInfo,
  logTime,
} = require("./utils/logger");

// Route Imports 🛣️
const patientRoutes = require("./modules/Patient/routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const billRoutes = require("./routes/billRoutes");
const medicineRoutes = require("./modules/Pharmacy/routes/medicineRoutes");
const pharmacyTransactionRoutes = require("./modules/Pharmacy/routes/pharmacyTransactionRoutes");
const stockAdjustmentRoutes = require("./modules/Pharmacy/routes/stockAdjustmentRoutes");
const pharmacyRequestRoutes = require("./modules/Pharmacy/routes/pharmacyRequestRoutes");
const labTestRoutes = require("./routes/labTestRoutes");
const receptionistRoutes = require("./routes/receptionistRoutes");

// 💡 Welcome Banner
logBanner();
console.log(chalk.cyan.bold("🌟 Welcome to Medicore Hospital Management System 💉\n"));

// Track boot time
const startTime = Date.now();

// Async server startup
(async () => {
  try {
    startSpinner("🚀 Booting Medicore server...");

    // Connect to DB
    await connectDB();
    stopSpinnerSuccess("🛢️ MongoDB connected");

    // Load Routes 🧩
    const loadRoute = (desc, path, route) => {
      startSpinner(`Loading ${desc}...`);
      app.use(path, route);
      stopSpinnerSuccess(`${desc} loaded`);
    };

    loadRoute("🩺 Patient routes", "/api/patients", patientRoutes);
    loadRoute("👨‍⚕️ Doctor routes", "/api/doctors", doctorRoutes);
    loadRoute("🏥 Department routes", "/api/departments", departmentRoutes);
    loadRoute("📅 Schedule routes", "/api/schedules", scheduleRoutes);
    loadRoute("💵 Billing routes", "/api/billing", billRoutes);

    // Pharmacy sub-modules
    loadRoute("💊 Medicine routes", "/api/pharmacy/medicine", medicineRoutes);
    loadRoute("📦 Pharmacy transaction routes", "/api/pharmacy/transactions", pharmacyTransactionRoutes);
    loadRoute("📉 Stock adjustment routes", "/api/pharmacy/stock-adjustments", stockAdjustmentRoutes);
    loadRoute("📬 Pharmacy request routes", "/api/pharmacy/requests", pharmacyRequestRoutes);

    // Laboratory
    loadRoute("🧪 Lab test routes", "/api/lab-tests", labTestRoutes);

    // Receptionist
    loadRoute("🧾 Receptionist routes", "/api/receptionists", receptionistRoutes);

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      logInfo(`🚦 Server is up and running on port ${PORT}`);
      logTime(startTime);
    });

  } catch (err) {
    stopSpinnerFail("💥 Medicore server failed to initialize");
    logError("Startup Error", err.message);
    process.exit(1);
  }
})();

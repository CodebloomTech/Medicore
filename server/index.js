const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chalk = require("chalk");

dotenv.config();
const app = express();
app.use(express.json());

// Custom modules
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

// Route imports
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const billRoutes = require("./routes/billRoutes");
app.use("/api/bills", billRoutes); // 👈 should be like this


const medicineRoutes = require("./routes/medicineRoutes");
const pharmacyTransactionRoutes = require("./routes/pharmacyTransactionRoutes");
const stockAdjustmentRoutes = require("./routes/stockAdjustmentRoutes");
const pharmacyRequestRoutes = require("./routes/pharmacyRequestRoutes");

// Show ASCII art banner
logBanner();
console.log(chalk.cyan("Welcome to Medicore 💉"));

// App start timestamp
const startTime = Date.now();

(async () => {
  try {
    startSpinner("🚀 Starting Medicore server...");

    await connectDB();
    stopSpinnerSuccess("🛢️ MongoDB connected");

    // Load patient routes
    startSpinner("Loading patient routes...");
    app.use("/api/patients", patientRoutes);
    stopSpinnerSuccess("🩺 Patient routes loaded");

    // Load doctor routes
    startSpinner("Loading doctor routes...");
    app.use("/api/doctors", doctorRoutes);
    stopSpinnerSuccess("👨‍⚕️ Doctor routes loaded");

    // Load department routes
    startSpinner("Loading department routes...");
    app.use("/api/departments", departmentRoutes);
    stopSpinnerSuccess("🏥 Department routes loaded");

    // Load schedule routes
    startSpinner("Loading schedule routes...");
    app.use("/api/schedules", scheduleRoutes);
    stopSpinnerSuccess("📅 Schedule routes loaded");

    // Load billing/cashier routes
    startSpinner("Loading billing routes...");
    app.use("/api/billing", billRoutes);
    stopSpinnerSuccess("💵 Billing routes loaded");

    // Load pharmacy routes
    startSpinner("Loading pharmacy medicine routes...");
    app.use("/api/pharmacy/medicine", medicineRoutes);
    stopSpinnerSuccess("💊 Medicine routes loaded");

    startSpinner("Loading pharmacy transaction routes...");
    app.use("/api/pharmacy/transactions", pharmacyTransactionRoutes);
    stopSpinnerSuccess("📦 Pharmacy transaction routes loaded");

    startSpinner("Loading stock adjustment routes...");
    app.use("/api/pharmacy/stock-adjustments", stockAdjustmentRoutes);
    stopSpinnerSuccess("📉 Stock adjustment routes loaded");

    startSpinner("Loading pharmacy request routes...");
    app.use("/api/pharmacy/requests", pharmacyRequestRoutes);
    stopSpinnerSuccess("📬 Pharmacy request routes loaded");

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      logInfo(`🚦 Server running on port ${PORT}`);
      logTime(startTime);
    });

  } catch (err) {
    stopSpinnerFail("💥 Failed to initialize Medicore server");
    logError("Startup Error", err.message);
    process.exit(1);
  }
})();

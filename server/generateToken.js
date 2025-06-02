const jwt = require("jsonwebtoken");
require("dotenv").config();

const payload = {
  id: "user123",
  email: "admin@example.com",
  role: "admin",
};

const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
console.log("Your token:", token);

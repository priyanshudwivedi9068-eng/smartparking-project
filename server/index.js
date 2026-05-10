const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const connectDB = require("./config/db");
const parkingRoutes = require("./routes/parkingRoutes");
const authRoutes = require("./routes/authRoutes");

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/parking", parkingRoutes);
app.use("/api/parking/auth", authRoutes);

app.get("/", (req, res) =>
  res.send("🚗 SpotSync API is Running (Clean Version)"),
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

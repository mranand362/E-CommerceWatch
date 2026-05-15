// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";
import path from "path";
import { fileURLToPath } from "url";

// Load env variables
dotenv.config();

// Fix DNS (important for MongoDB Atlas on some networks)
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";

// Middleware
import { errorHandler } from "./src/middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- ROOT ROUTE ----------------
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 E-Commerce Backend is Running on Render",
  });
});

// ---------------- HEALTH CHECK ----------------
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is healthy ✅",
  });
});

// ---------------- DATABASE CONNECTION ----------------
mongoose
  .connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/luxury_watch_db"
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ---------------- API ROUTES ----------------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// ---------------- ERROR HANDLER ----------------
app.use(errorHandler);

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
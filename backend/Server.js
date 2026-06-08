import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";

import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";

import { errorHandler } from "./src/middleware/errorMiddleware.js";

dotenv.config();

// DNS fix for Render
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    "https://e-commerce-watch-seven.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  credentials: true
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/cors-test", (req, res) => {
  res.json({ success: true, message: "CORS Working" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend Running" });
});

app.get("/api", (req, res) => {
  res.json({ success: true, message: "API Running" });
});

// Error handler (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📍 API URL: http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });
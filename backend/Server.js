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

// DNS fix (MongoDB stability)
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://luxurytimewatch.netlify.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- ROOT ---------------- */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 E-Commerce Backend Running on Render"
  });
});

/* ---------------- HEALTH ---------------- */
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server healthy ✅"
  });
});

/* ---------------- PORT ---------------- */
const PORT = process.env.PORT || 5000;

/* ---------------- DATABASE + SERVER START ---------------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
    process.exit(1);
  });

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

/* ---------------- ERROR HANDLER ---------------- */
app.use(errorHandler);
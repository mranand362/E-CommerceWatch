import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";

import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";

// ✅ IMPORT both error handlers
import { errorHandler, notFound } from "./src/middleware/errorMiddleware.js";

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

// CORS
app.use(cors({
  origin: [
    "https://e-commerce-watch-seven.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/cors-test", (req, res) => {
  res.json({ success: true, message: "CORS Working" });
});

// ✅ ROUTES - All routes here
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend Running" });
});

app.get("/api", (req, res) => {
  res.json({ success: true, message: "API Running" });
});

// ✅ 404 HANDLER - AFTER all routes
app.use(notFound);

// ✅ ERROR HANDLER - VERY LAST
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";
import bodyParser from "body-parser";

import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";

import { errorHandler } from "./src/middleware/errorMiddleware.js";

// Load environment variables
dotenv.config();

// DNS fix for MongoDB stability
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`);
  console.error('💡 Please check your .env file');
  process.exit(1);
}

const app = express();

/* ---------------- CORS CONFIGURATION - FIXED FOR NETLIFY ---------------- */

const allowedOrigins = [
 
  "https://e-commerce-watch-seven.vercel.app"
 
];

// Main CORS middleware - handle everything in one place
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    // Allow localhost in development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // ✅ CRITICAL FIX: Allow ALL Netlify subdomains (preview deploys)
    // This matches any URL that contains 'netlify.app'
    if (origin.includes('netlify.app')) {
      return callback(null, true);
    }
    
    // Check against allowed origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Note: Do NOT add app.options('*', cors()) - it causes errors in Express 5

/* ---------------- BODY PARSER ---------------- */
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

/* ---------------- SIMPLE REQUEST LOGGING ---------------- */
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});

/* ---------------- API ROUTES ---------------- */

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

/* ---------------- ROOT ROUTE ---------------- */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 E-Commerce Backend Running",
    version: "1.0.0",
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

/* ---------------- API INFO ROUTE ---------------- */

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      products: "/api/products",
      cart: "/api/cart",
      orders: "/api/orders"
    }
  });
});

/* ---------------- HEALTH ROUTE ---------------- */

app.get("/api/health", async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.status(200).json({
    status: "OK",
    message: "Server Healthy ✅",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      status: dbStatus[dbState],
      connected: dbState === 1,
      name: dbState === 1 && mongoose.connection.db ? mongoose.connection.db.databaseName : null
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

/* ---------------- 404 HANDLER ---------------- */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    error: "Not Found"
  });
});

/* ---------------- ERROR HANDLER ---------------- */

app.use(errorHandler);

/* ---------------- PORT ---------------- */

const PORT = process.env.PORT || 5000;

/* ---------------- DATABASE CONNECTION & SERVER START ---------------- */

let server;

console.log(`🔌 Connecting to MongoDB...`);

// MongoDB connection options
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

mongoose
  .connect(process.env.MONGO_URI, mongooseOptions)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    if (mongoose.connection.db) {
      console.log(`📦 Database: ${mongoose.connection.db.databaseName}`);
    }
    console.log(`🔗 MongoDB Host: ${mongoose.connection.host}`);

    server = app.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}`);
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 CORS enabled for: All Netlify subdomains and localhost`);
      console.log(`\n✨ Ready to accept requests!\n`);
    });
  })
  .catch((err) => {
    console.error("\n❌ MongoDB Connection Error:", err.message);
    console.error("💡 Please check your MONGO_URI in .env file\n");
    process.exit(1);
  });

/* ---------------- GRACEFUL SHUTDOWN ---------------- */

const gracefulShutdown = async (signal) => {
  console.log(`\n🛑 ${signal} received. Shutting down gracefully...`);
  
  if (server) {
    server.close(async (err) => {
      if (err) {
        console.error('❌ Error closing HTTP server:', err);
        process.exit(1);
      }
      
      console.log('✅ HTTP server closed');
      
      try {
        await mongoose.connection.close();
        console.log('✅ MongoDB connection closed');
        console.log('👋 Graceful shutdown completed');
        process.exit(0);
      } catch (dbErr) {
        console.error('❌ Error during MongoDB disconnection:', dbErr);
        process.exit(1);
      }
    });
    
    setTimeout(() => {
      console.error('❌ Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

process.on('uncaughtException', (err) => {
  console.error('\n❌ Uncaught Exception:', err);
  gracefulShutdown('Uncaught Exception');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('\n❌ Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
  gracefulShutdown('Unhandled Rejection');
});

mongoose.connection.on('connected', () => {
  console.log('🔌 MongoDB connected event fired');
});

mongoose.connection.on('error', (err) => {
  console.error('🔌 MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 MongoDB disconnected');
});
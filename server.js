import "./config/env.js"; 
import express from "express";import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import truckRoutes from "./routes/truckRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import collectorRoutes from "./routes/collectorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";


connectDB();

const app = express();

/* Middleware */

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/* Routes */

app.use("/api/auth", authRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/products", productRoutes);
app.use("/api/trucks", truckRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/collector", collectorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/upload", uploadRoutes);

/* Test Route */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to EcoCollect API",
  });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "EcoCollect API is running" });
});

/* Port */

const PORT = process.env.PORT || 5300;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});


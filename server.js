import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

/* Middleware */

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

/* Test Route */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to EcoCollect API",
  });
});

/* Port */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});


app.use("/api/auth", authRoutes);
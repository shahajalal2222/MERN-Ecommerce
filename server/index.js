import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import dbConnect from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRouter.js";
import productRoute from "./routes/productRoute.js";

const app = express();

// ======================
// BODY PARSERS
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// CORS CONFIG
// ======================
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-ecommerce-3-yypv.onrender.com",
  "https://mern-ecommerce-5-vx2f.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  })
);

// ======================
// CONNECT DATABASE
// ======================
dbConnect();
connectCloudinary();

// ======================
// API ROUTES
// ======================
app.use("/api/user", userRouter);
app.use("/api/product", productRoute);

// ======================
// SERVE FRONTEND (VITE BUILD)
// ======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ⚠️ IMPORTANT:
// If your frontend folder is "client" → use client
// If it's "admin" → change to ../admin/dist
const frontendPath = path.join(__dirname, "../client/dist");

app.use(express.static(frontendPath));

// ======================
// SPA FALLBACK (NO CRASH VERSION)
// ======================
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.join(frontendPath, "index.html"));
  } else {
    next();
  }
});

// ======================
// START SERVER
// ======================
const port = process.env.PORT || 4040;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
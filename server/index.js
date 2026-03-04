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
// CONNECT DATABASE & CLOUDINARY
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

// ⚠️ IMPORTANT: update if your frontend folder is "admin" instead of "client"
const frontendPath = path.join(__dirname, "../client/dist");

app.use(express.static(frontendPath));

// ======================
// SPA FALLBACK (FOR REFRESH)
// ======================
app.use((req, res, next) => {
  // Only GET requests and non-API routes should fallback to index.html
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.join(frontendPath, "index.html"));
  } else {
    next();
  }
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 4040;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
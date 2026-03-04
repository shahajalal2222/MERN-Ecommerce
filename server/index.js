
import express from "express";
import 'dotenv/config';
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import dbConnect from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRouter.js";
import productRoute from "./routes/productRoute.js";

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-ecommerce-3-yypv.onrender.com",
  "https://mern-ecommerce-5-vx2f.onrender.com"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization","token"]
}));

// Connect DB & Cloudinary
dbConnect();
connectCloudinary();

// --- API ROUTES ---
app.use('/api/user', userRouter);
app.use('/api/product', productRoute);

// --- Serve SPA ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../admin/dist')));

// Correct SPA catch-all
app.get((req, res) => {
  res.sendFile(path.join(__dirname, '../admin/dist', 'index.html'));
});

// Start server
const port = process.env.PORT || 4040;
app.listen(port, () => console.log(`Server running on port: ${port}`));
import express from "express";
import 'dotenv/config';
import cors from "cors";
import dbConnect from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRouter.js";
import productRoute from './routes/productRoute.js';

const app = express();

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-ecommerce-3-yypv.onrender.com",
  "https://mern-ecommerce-5-vx2f.onrender.com"
];

// CORS
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Connect DB + Cloudinary
dbConnect();
connectCloudinary();

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRoute);

// Test
app.get('/', (req, res) => res.send("hello from orebi server"));

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port: ${port}`));
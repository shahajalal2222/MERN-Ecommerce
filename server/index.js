import express from "express";
import 'dotenv/config';
import cors from "cors";
import dbConnect from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRouter.js";
import productRoute from './routes/productRoute.js';

const app = express();

// ✅ Body parsers must be BEFORE routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ CORS middleware before routes
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-ecommerce-3-yypv.onrender.com"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ✅ Connect DB + Cloudinary
dbConnect();
connectCloudinary();

// ✅ Routes after CORS
app.use('/api/user', userRouter);
app.use('/api/product', productRoute);

// Test route
app.get('/', (req, res) => {
  res.send("hello from orebi server");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on: ${port}`);
});
import express from "express";
import 'dotenv/config';
import dbConnect from "./config/mongodb.js";
import userRouter from "./routes/userRouter.js";
import productRoute from './routes/productRoute.js'
import cors from "cors";
import { connect } from "mongoose";
import connectCloudinary from "./config/cloudinary.js";
const app=express();
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    "http://localhost:5173",     // local frontend (Vite)
    "https://mern-ecommerce-3-yypv.onrender.com/" // deployed frontend
  ],
  credentials: true
}));

app.use(express.json());
dbConnect()
connectCloudinary();
const port=process.env.PORT||8000;
app.get('/',(req,res)=>{
    res.send("hello from orebi server");
});
app.use('/api/user/',userRouter);
app.use('/api/product',productRoute);

app.listen(port,()=>{
 console.log(`server is running on: ${port}`);
});


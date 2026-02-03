import express from "express";
import 'dotenv/config';
import dbConnect from "./config/mongodb.js";
import userRouter from "./routes/userRouter.js";
import cors from "cors";
const app=express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
dbConnect()
const port=process.env.PORT||8000;
app.get('/',(req,res)=>{
    res.send("hello from orebi server");
});
app.use('/api/user/',userRouter);

app.listen(port,()=>{
 console.log(`server is running on: ${port}`);
});


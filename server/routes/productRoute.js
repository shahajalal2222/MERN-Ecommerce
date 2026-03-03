import express from "express";
import { addProduct, listProduct, removeProduct, singleProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js"
const productRoute=express.Router();

productRoute.post("/add",upload.fields([
    {name:"image1",maxCount:1},
   {name:"image2",maxCount:1}, 

]),
adminAuth,
addProduct
);
productRoute.post("/remove",removeProduct);
productRoute.get("/list",listProduct);
productRoute.get("/single",singleProduct);

export default productRoute;
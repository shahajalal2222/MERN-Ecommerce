
import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js"
const addProduct = async(req, res) => {
  try {
    const {
      _type,
      name,
      price,
      discountedPercentage,
      category,
      brand,
      badge,
      isAvailable,
      offer,
      description,
      tags
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    if (!name) {
     return res.send({
        success: false,
        message: "Product name is required",
      });
    }
    if (!price) {
      return res.send({
        success: false,
        message: "Product price is required",
      });
    }
    if (!category) {
      return res.send({
        success: false,
        message: "Product category is required",
      });
    }
    if (!description) {
     return  res.send({
        success: false,
        message: "Product description is required",
      });
    } 
let images=[image1,image2].filter((item)=>item!==undefined);
let imagesUrl=await Promise.all(
  images.map(async(item)=>{
   let result=await cloudinary.uploader.upload(item.path,{
    resource_type:"image"
   });
   return result.secure_url;
  })
)
let parsedTags;
try{
 parsedTags=JSON.parse(tags);
}
catch(error){
 parsedTags=tags? tags.split(",").map((tag)=>tag.trim()):[];
}
const productData={
_type:_type? _type:"",
name,
price:Number(price),
discountedPercentage:Number(discountedPercentage),
category,
brand:brand? brand:"",
badge:badge=== "true"? true:false,
isAvailable:isAvailable==="true"? true:false,
offer:offer==="true"? true:false,
description,
tags:tags? parsedTags:[],
images: imagesUrl,


}
  const product=new productModel(productData);
  product.save();
    res.send({
      success: true,
      message: `${name} added and saved in DB successfully`,

    });
  }
  catch (error) {
    console.log("Error", error);
   return res.json({
      success: false,
      message: error.message,
    })
  }
}
const removeProduct = async(req, res) => {
  try{
    await productModel.findByIdAndDelete(req.body._id);
    res.json({
      success:true,
      message:"Product remove successfully",
    });
  }
  catch(error){
    console.log("error",error);
   return res.json({
      success:false,
      message:error.message,
    });
  }
}
const listProduct = async(req, res) => {
  try{
     const total=await productModel.countDocuments({});
     const product=await productModel.find({});
     if(!product.length){
     return res.json({
        success:false,
        message:"No product found",
      })
     }
     res.send({
      success:true,
      total,
      product,
     });
  }
  catch(error){
    console.log("Error",error);
   return res.json({
      success:false,
      message:error.message,
    });
  }
}
const singleProduct = async(req, res) => {
  try{
    const {_id}=req.query;
    const product=await productModel.findById(_id);
    if(!product){
      return res.json({
        success:false,
        message:"No product match with this id",
      });
    }
    res.json({
      success:true,
      product,
    })
  }
  catch(error){
    console.log(error);
    return res.json({
      success:true,
      message:error.message, 
    });
  }
}

export { addProduct, removeProduct, listProduct, singleProduct };

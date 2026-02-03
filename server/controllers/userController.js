import userModel from "../routes/userModel.js";
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin:user.isAdmin
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "10h"
        }
    );
}
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.json({
                success: false,
                message: "user email is required",
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User doesn't exist",
            });
        }
        if (!password) {
            return res.json({
                success: false,
                message: "Password is required",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user);
            res.json({
                success: true,
                token,
                message: "User login successfully",
            });
        }
        else {
            return res.json({
                success: false,
                message: "Invalid credentials,try again",
            });
        }
    }
    catch (error) {
        console.log("user login error", error);
        res.json({
            success: true,
            message: error.message,

        });
    }
};
const userRegister = async (req, res) => {
    try {
        const { name, email, password ,isAdmin} = await req.body;
        // request body verification
        if (!name) {
            return res.json({
                success: false,
                message: "user name is required",
            });
        }
        if (!email) {
            return res.json({
                success: false,
                message: "user email is required",
            });
        }
        if (!password) {
            return res.json({
                success: false,
                message: "Password is required",
            });
        }
        //email validation
        if (!validator.isEmail(email)) {
            return res.json({
                success: true,
                message: "Please enter a valid email address",
            });
        }
        //check user status
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exist",
            });
        }
        //password validation
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Your password length should be equal to 8 or greater than it",
            });
        }
        //Hashing user password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        //register a new user for database
        const newUser = new userModel({
            name,
            email,
            password: encryptedPassword,
            isAdmin,
        });
        //save a new user in databese
        await newUser.save();
        res.json({
            success: true,
            message: "User registered successfully",
        });
    }
    catch (error) {
        console.log("user register error", error);
        res.json({
            success: true,
            message: error.message,

        });
    }
};
const adminLogin = async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email) {
            return res.json({
                success: false,
                message: "user email is required",
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User doesn't exist",
            });
        }
        if (!password) {
            return res.json({
                success: false,
                message: "Password is required",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!user?.isAdmin){
            return res.json({
                success:false,
                message:"You are not authorized to login",
            })
        }
        if (isMatch&&user.isAdmin) {
            const token = createToken(user);
            res.json({
                success: true,
                token,
                message: "Admin logged successfully",
            });
        }
        else {
            return res.json({
                success: false,
                message: "Password is not match,try again",
            });
        }
    }
    catch(error){
        console.log("Admin login error",error);
         res.json({
           success:false,
           message:error.message,
        });
    }
 };
const removeUser = async (req, res) => {
    try{
        await userModel.findByIdAndDelete(req.body._id);
        res.json({
         success:true,
         message:"User was deleted successfully",
        });
    }
    catch(error){
        console.log("Removed user error",error);
        res.json({
            success:false,
            message:error.message,
        });
    }
 };
const updateUser = async (req, res) => {
    try{
       const {_id,name,email,password,isAdmin}=req.body;
       const user=await userModel.findById(_id);
       if(!user){
        return res.json({
           success:false,
           message:"user is not found",
        });
       }
       if(name)user.name=name;
       if(email){
        if(!validator.isEmail(email)){
            return res.json({
              success:false,
              message:"Please enter a valid email",
            });
        }
        user.email=email;
       }
       if(password){
        if(password.length<8){
            return res.json({
              success:false,
              message:"Please length should be greater of equal to 8",
            });
        }
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
       }
       //updating the user
       await user.save();
       res.json({
        success:true,
        message:"User update successfully",
       });
    }
    catch(error){
        console.log("Update user error");
        res.json({
            success:false,
            messsage:error.message,
        });
    }
 };
const getUsers = async (req, res) => {
    try{
     const total=await userModel.countDocuments({});
     const users=await userModel.find({});
     res.json({
        success:true,
        total,
        users,
     });
    }
    catch(error){
      console.log("all users get errors",error);
         res.json({
          scuccees:false,
          message:error.message,
         });
    }
};
export {
    userLogin,
    userRegister,
    adminLogin,
    removeUser,
    updateUser,
    getUsers,
};
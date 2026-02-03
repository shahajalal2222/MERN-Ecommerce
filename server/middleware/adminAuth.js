import jwt, { decode } from "jsonwebtoken";
const adminAuth=async(req,res,next)=>{
    try{
      const { token }=req.headers;
      if(!token){
        return res.json({
            success:false,
            message:"Not Authorized,Try Again",
        });
      }
      const decode_token=jwt.verify(token,process.env.JWT_SECRET);
      const { isAdmin }=decode_token;
      if(!isAdmin){
        return res.json({
         success:false,
         message:"Not Authorized,Try Again",
        });
      }
      next();
    }
    catch(error){
        console.log("Admin Auth error",error);
        res.json({
           success:false,
           message:error?.message, 
        });
    }
}
export default adminAuth;
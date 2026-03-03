import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import Label from "../components/Label";
import toast from "react-hot-toast";
import { serverUrl } from "../../config";
import axios from "axios";
const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Loading,setLoading]=useState(false)
    //Error state
    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token]);

    //email validation
   const emailValidation=(email)=>{
    return String(email).toLowerCase().
    match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
   }


    const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  }

  const handleSignIn=async(e)=>{
    e.preventDefault();
    if(!email){
      setErrEmail("Enter your Email");
    }
    if(!password){
      setErrPassword("Enter your password");
    }
    if(email&&password){
      try{
         setLoading(true);
         const response=await axios
         .post(serverUrl+"/api/user/login",{
          email,
          password,
         });
         const data=response?.data;
         if(data?.success){
           console.log(data);
           localStorage.setItem("token",data?.token);
           toast.success(data?.messege);
           navigate("/");
         }
         else{
          toast.error(data?.messege)
         }
      }
      catch(error){
        //console.error("User login error:",error);
        toast.error(error?.messege);
      }
      finally{
        setLoading(false);
      }
    }
  }

  return (
    <div className="w-full h-full flex items-center 
    justify-center">
      <form className="w-full max-w-lg flex items-center 
      justify-center border border-gray-300 my-20 rounded-md
      shadow-sm shadow-orange-400 mx-4">
        <div className="px-6 py-4 flex flex-col justify-center w-full">
          <Title className="underline underline-offset-4
          decoration-[2%] mb-4">Sign in Page</Title>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="email">Work Email</Label>
              <Input placeholder="john@gmail.com"
                type="email"
                onChange={handleEmail}
                value={email}
                required
              />
              {errEmail && <p className="text-sm text-red-500
                          font-semibold">
                <span className="font-bold italic mr-1">!</span>
                {errEmail}</p>}
            </div>

            <div className="flex flex-col gap-0.5">
              <Label htmlFor="password">Password</Label>
              <Input placeholder="Create password"
                type="password"
                onChange={handlePassword}
                value={password}
              />
              {errPassword && <p className="text-sm text-red-500
                          font-semibold">
                <span className="font-bold italic mr-1">!</span>
                {errPassword}</p>}
            </div>
            <button onClick={handleSignIn}
            disabled={Loading}
             className="bg-black/90 hover:bg-black
            text-gray-200 hover:text-white cursor-pointer
            w-full text-base font-medium h-10 rounded-md
            hoverEffect disabled:bg-black/40 
            disabled:cursor-not-allowed">
              {Loading ? "Processing" : "Sign In"}
              </button>
            <p className="text-sm text-center font-medium">
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="hover:text-blue-600 underline 
              underline-offset-2 decoration-1 hoverEffect">
                  Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
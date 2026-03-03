import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Label from "../components/Label";
import toast from "react-hot-toast"
import axios from "axios";
import { serverUrl } from "../../config";

const SignUp = () => {
  const [loading,setLoading]=useState(false);
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  //Error state
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token]);

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  }

  //email validation
   const emailValidation=(email)=>{
    return String(email).toLowerCase().
    match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
   }

   const handleChecked=(e)=>{
    setChecked(e.target.checked);
   }

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your Name");
    }
    if(!email){
      setErrEmail("Enter your email");
    }
    else
    {
      if(!emailValidation(email)){
        setErrEmail("Enter a valid email");
      }
    }
    if(!password){
      setErrPassword("Enter a password");
    }
    try{
      setLoading(true);
      if(clientName&&email&&emailValidation(email)&&password){
         const response=await axios.post(`${serverUrl}/api/user/register`,
          {
            name:clientName,
            email,
            password,
          }
        );
        const data=response?.data;
        if(data?.success){
          toast.success(data?.message);
          navigate("/signin")
        }
        else{
           toast.error(data?.message);
        }
      }
    }
    catch(error){
      console.error("User registration error:",error);
      toast.error(error?.message)
    }
    finally{
      setLoading(false);
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
          decoration-[2%] mb-4">
            Create your account
          </Title>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="name">Full Name</Label>
              <Input placeholder="ex: John Doe" type="text"
                onChange={handleName}
                value={clientName}
              />
              {errClientName && <p className="text-sm text-red-500
              font-semibold">
                <span className="font-bold italic mr-1">!</span>
                {errClientName}</p>}
            </div>
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
            <div className="flex items-center
            gap-2">
              <input type="checkbox"
              onClick={handleChecked}
              />
              <p className="text-sm text-black/80">
                I agree to the OREBI
                <span className="text-blue-500">
                  Terms of Services</span> and{" "}
                <span>Privacy Policy</span>
              </p>
            </div>
            <button
            disabled={!checked||loading}
             onClick={handleSignUp}
              className="bg-black/90 hover:bg-black
            text-gray-200 hover:text-white cursor-pointer
            w-full text-base font-medium h-10 rounded-md
            hoverEffect disabled:bg-black/40 
            disabled:cursor-not-allowed">
              {loading ? "Processing..." : "Create Account"}</button>
            <p className="text-sm text-center font-medium">
              Already have an Account?{" "}
              <Link to="/signin">
                <span className="hover:text-blue-600 underline 
              underline-offset-2 decoration-1 hoverEffect">
                  Sign in</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
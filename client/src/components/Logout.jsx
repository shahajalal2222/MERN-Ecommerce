import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate=useNavigate();
    const hanldeLogout=()=>{
        //console.log(data)
      localStorage.removeItem("token");
      toast.success("Log out successfully");
      navigate("/");
    }
  return (
    <button onClick={hanldeLogout}
     className="bg-black/70 px-6 py-2 text-gray-200 
    hover:bg-black hover:text-white hoverEffect
    rounded-md mt-2">
      Logout
    </button>
  )
}

export default Logout;
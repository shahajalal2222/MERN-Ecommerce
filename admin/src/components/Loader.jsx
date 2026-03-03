import React from 'react';
import { FaSpinner } from "react-icons/fa6";
const Loader=()=>{
    return (
    <div className="text-orange-600 text-5xl w-full
    py-40  flex flex-col items-center justify-center">
        <FaSpinner className="animate-spin" />
        <p className="text-lg text-black font-medium
       tracking-wide mt-1">Loading...</p>
    </div>
);
};
export default Loader;
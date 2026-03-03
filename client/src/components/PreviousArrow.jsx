import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
const PreviousArrow = (props) => {
    const {onClick}=props;
  return (
    <div className="w-14 h-14 rounded-full text-white
    bg-black/40 hover:bg-black hoverEffect
    flex items-center justify-center absolute top-[35%] left-0
    z-10 cursor-pointer" onClick={onClick}>
      <FaLongArrowAltLeft/>
    </div>
  );
};

export default PreviousArrow;

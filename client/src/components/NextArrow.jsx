import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
const NextArrow = (props) => {
    const {onClick}=props;
  return (
    <div className="w-14 h-14 rounded-full text-white
    bg-black/40 hover:bg-black hoverEffect
    flex items-center justify-center absolute top-[35%] right-2.5
    z-10 cursor-pointer" onClick={onClick}>
      <FaLongArrowAltRight/>
    </div>
  );
};

export default NextArrow;

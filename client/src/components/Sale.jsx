import React from 'react';
import { saleImgOne, saleImgThree } from '../assets/images';
import { saleImgTwo } from '../assets/images';
import { Link } from 'react-router-dom';

const Sale = () => {
  return (
    <div className="w-full h-auto md:h-[550px] flex flex-col
    md:flex-row items-center justify-between gap-5 ">
      {/*for left*/}
      <div className="w-full md:w-[50%] h-[250px] md:h-full border
      border-gray-300 rounded-md overflow-hidden relative
      group">
        <img src={saleImgOne} alt="saleImgOne" className="w-full h-full object-cover
        group-hover:scale-x-110 duration-500 ease-in-out" />
        <div className="absolute w-full h-full left-0 top-0 bg-black/40
        text-white/80 flex items-center md:justify-center">
          <div className="flex flex-col md:items-center gap-2 p-10">
            <p className="text-sm md:text-lg font-medium 
            text-white">10% sales on going on phone</p>
            <p className="text-sm md:text-xl font-semibold">Offers on limited</p>
            <Link to="/shop" className="bg-white/70 text-black px-8 py-2.5 rounded-md
            hover:bg-white duration-300 font-medium">Shop Now</Link>
          </div>
        </div>
      </div>

      {/*for right*/}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-between
      gap-10 md:gap-2 px-10 py-2">
        <div className="w-full h-[250px] md:h-[46%] border border-gray-300 
      rounded-md overflow-hidden relative group">
          <img src={saleImgTwo} alt="saleImgTwo" className="w-full h-full object-cover
        group-hover:scale-x-110 duration-500 ease-in-out" />
          <div className="absolute w-full h-full left-0 top-0 bg-black/40
        text-white/80 flex items-center">
            <div className="flex flex-col items-start gap-2 p-10">
              <p className="text-sm md:text-lg font-medium 
            text-white">5% sales on going on headphone</p>
              <p className="text-sm md:text-xl font-semibold">Offers on limited</p>
              <Link to="/shop" className="bg-white/70 text-black px-8 py-2.5 rounded-md
            hover:bg-white duration-300 font-medium">Shop Now</Link>
            </div>
          </div>
        </div>
        <div className="w-full h-[250px] md:h-[46%] border border-gray-300 
      rounded-md overflow-hidden relative group">
          <img src={saleImgThree} alt="saleImgThree" className="w-full h-full object-cover
        group-hover:scale-x-110 duration-500 ease-in-out" />
          <div className="absolute w-full h-full left-0 top-0 bg-black/40
        text-white/80 flex items-center">
            <div className="flex flex-col items-start gap-2 p-10">
              <p className="text-sm md:text-lg font-medium 
            text-white">20% sales on going on phone</p>
              <p className="text-sm md:text-xl font-semibold">Offers on limited</p>
              <Link to="/shop" className="bg-white/70 text-black px-8 py-2.5 rounded-md
            hover:bg-white duration-300 font-medium">Shop Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sale;

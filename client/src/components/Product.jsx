import React from "react";
import Badge from "./Badge";
import { PriceContainer } from "./PriceContainer";
import AddToCartButton from "./AddToCartButton";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
const Product = ({item,className}) => {
  return (
    <div className={twMerge("w-full group pr-2.5",
        className
    )}>
        <div className="h-72 border border-black rounded-tr-md
        rounded-tl-md overflow-hidden relative">
            <Link to={`/product/${item?._id}`}
            className="w-full h-full overflow-hidden
            bg-[#f3f3f3]">
                <img src={item?.images[0]} alt="productImage" 
                className="w-full h-full group-hover:scale-110 duration-300
                object-cover" />
            </Link>
            <div className="absolute top-2 right-2">
                {item?.offer && <Badge title='Sale' 
                className="rounded-md"/>}
            </div>
        </div>
        <div className="py-4 flex flex-col gap-1
        boreder-[1px] border-t-0 border-gray-300 px-5
        rounded-b-md">
           <p className="text-lg text-black font-bold
           ">{item?.name}</p> 
           <PriceContainer item={item}/>
           <AddToCartButton item={item}/>
        </div>
    </div>
  )
};

export default Product;

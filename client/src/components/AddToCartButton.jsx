import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity } from "../redux/orebiSlice";
import { FaMinus, FaPlus } from "react-icons/fa";

const AddToCartButton = ({ item, className }) => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.orebi);
  const [cartProduct, setCartProduct] = useState(null);
  useEffect(() => {
    const existingProduct = products?.find((product) =>
      product?._id === item?._id);
    setCartProduct(existingProduct);
  }, [item, products]);

    const handleAddToCart = () => {
    dispatch(addToCart(item))
    toast.success(`${item?.name} added successfully`);
    //console.log(item);
  }

 const handleIncreaseQuantity=()=>{
  dispatch(increaseQuantity(item?._id))
   toast.success(`${item?.name} increased successfully`);
 }
 const handleDecreaseQuantity=()=>{
  dispatch(decreaseQuantity(item?._id));
   toast.success(`${item?.name} decreased successfully`);
 }

  return (
    <div className="h-12">
      {cartProduct ? (
        <div className="w-full h-full flex items-center gap-2
      ">
          <button disabled={cartProduct?.quantity==1}
           onClick={handleDecreaseQuantity}
          className="w-6 h-6 border inline-flex 
          items-center justify-center border-gray-400 rounded-sm
           hover:bg-gray-950 hover:text-white hoverEffect
           disabled:text-gray-400 disabled:border-gray-200
           disabled:hover:cursor-not-allowed 
           disabled:hover:bg-transparent
           disabled:hover:text-gray-400">
            <FaMinus className="text-sm" />
          </button>
          <p className="text-base font-semibold w-6 text-center
          ">
            {cartProduct?.quantity}</p>
          <button onClick={handleIncreaseQuantity}
          className="w-6 h-6 border inline-flex 
          items-center justify-center border-gray-400 rounded-sm
           hover:bg-gray-950 hover:text-white hoverEffect">
            <FaPlus className="text-sm" />
          </button>
        </div>) : (<button
          onClick={handleAddToCart}
          className={twMerge("bg-black/90 text-white/90 text-sm font-medium py-2 w-full rounded-md mt-2 hover:text-white hover:bg-black hoverEffect",
            className
          )}>
          Add to Cart</button>
      )}
    </div>
  );
};

export default AddToCartButton;

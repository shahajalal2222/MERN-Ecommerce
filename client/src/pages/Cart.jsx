import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import { emptyCart } from "../assets/images";
import { Link } from "react-router-dom";
import CartProduct from "./CartProduct";
import { resetCart } from "../redux/orebiSlice";
import PriceFormat from "../components/PriceFormat";
import toast from "react-hot-toast";

const Cart = () => {
  const { products } = useSelector((state) => state.orebi);
  const dispatch = useDispatch();
  const [subTotal,setSubTotal]=useState("");
  const [total,setTotal]=useState("");

useEffect(()=>{
let price=0;
let discountedPrice=0;
products?.map((item)=>{
  price+=(item?.price * item?.quantity+(item?.discountedPercentage*item?.
    price)/100*item?.quantity);
    discountedPrice+=item?.price*item?.quantity;
    return price,discountedPrice;
});
setSubTotal(price);
setTotal(discountedPrice);
},[products])



  const handleReset = () => {
    const confirmed = window.confirm("Are you sure to reset your cart")
    if (confirmed) {
      dispatch(resetCart());
    }
    else {

    }
  }
  const handleCheckout=()=>{
    toast.success(`Payment will be proceed shortly for $${total}`)
  }
  return (
    <Container>
      <Title>My Cart</Title>
      {products?.length > 0 ? (
        <div className="py-10">
          <div className="w-full h-20 bg-[#f5f7f7] text-black
        hidden lg:grid grid-cols-5 place-content-center px-6
        text-lg font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Subtotal</h2>
          </div>
          <div className="mt-5">
            {products?.map((item) => (
              <CartProduct key={item?._id} item={item} />
            ))}
          </div>
          <div className="flex items-start justify-between">
            <button onClick={handleReset}
              className="py-2.5 px-10 bg-red-500 text-white
          font-semibold uppercase mb-4 rounded-md hover:bg-red-700
         hoverEffect">
              Reset Cart</button>
            <div className="max-w-xl gap-4 flex justify-end mt-4
            ">
              <div className="w-96 flex flex-col gap-4">
                <h2 className="text-xl font font-bold uppercase
               text-right">
                  Cart totals</h2>
                <div>
                  <p className="flex items-center justify-between
                  border-[1%] py-1.5 px-4 text-lg font-medium">
                    Subtotal
                    <PriceFormat amount={subTotal} className="font-semibold
                    tracking-wide"/>
                  </p>
                  <p className="flex items-center justify-between
                  border-[1%] py-1.5 px-4 text-lg font-medium
                  border-b-0 border-t-0">
                    Discount{" "}
                    <PriceFormat amount={subTotal-total} className="font-semibold
                    tracking-wide"/>
                  </p>
                  <p className="flex items-center justify-between
                  border-[1%] py-1.5 px-4 text-lg font-medium">
                    Total{" "}
                    <PriceFormat amount={total} className="font-bold
                    tracking-wide text-xl"/>
                  </p>
                </div>
                <div>
                  <button onClick={handleCheckout}
                  className="w-full rounded-md py-2.5
                  bg-black/90 text-white hover:bg-black
                  hoverEffect">
                    Proceed to Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) :
        (<div className="py-10">
          <img src={emptyCart} alt="emptyCart" className="max-w-80
        " />
          <div className="mt-5 flex flex-col gap-2.5">
            <h2 className="text-xl font-bold uppercase">
              Your Cart feels lonely</h2>
            <p className="text-sm max-w-96 text-lightText">
              Your Shopping cart lives to serve. Give it purpose
              -full it with
              books, electronics,videos,etc. and make it happy.
            </p>
            <Link to={"/shop"} className="bg-black/80
           text-white w-48 text-center roudned-md py-2
           hover:bg-black hoverEffect">
              continue Shopping
            </Link>
          </div>
        </div>)}
    </Container>
  )
};

export default Cart;
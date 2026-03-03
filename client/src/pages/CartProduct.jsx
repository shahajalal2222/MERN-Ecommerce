import React from 'react';
import toast from 'react-hot-toast';
import { ImCross } from "react-icons/im"
import { PriceContainer } from '../components/PriceContainer';
import AddToCartButton from '../components/AddToCartButton';
import PriceFormat from '../components/PriceFormat';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/orebiSlice';
const CartProduct = ({ item }) => {
  const dispatch=useDispatch()
  return (
    <div className=" border-gray-200 w-full grid grid-cols-5 mb-4 border py-2
    ">
      <div className="flex col-span-5 md:col-span-2 items-center
      gap-4 ml-4">
          <ImCross
           onClick={() =>{ 
            dispatch(deleteProduct(item?._id))
            toast.success(`${item?.name.
            substring(0, 10)}... is deleted successfully`)}
           }
             className='text-black/80 hover:text-red-500
             hoverEffect cursor-pointer'
             />
          <img src={item?.images[0]} alt="productImage" className="
        w-32 h-32 object-cover" />
          <h1 className="font-semibold">{item?.name}</h1>
      </div>
      <div className="col-span-5 md:col-span-3 flex flex-col
      md:flex-row md:items-center
      justify-between p-4 md:p-0">
        <div className='flex w-1/3 items-center'>
          <PriceContainer item={item} priceStyle=" text-lg
        font-semibold"/>
        </div>
        <div className='w-1/3 flex items-center gap-6'>
          <AddToCartButton item={item} className="
          border-red-500"/>
        </div>
        <div className='w-1/3 flex items-center'>
          <PriceFormat amount={item?.price*item?.quantity}/>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;

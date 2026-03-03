import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from '../../config'
import Title from '../components/Title'
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import PriceFormat from "../components/PriceFormat";
import {IoMdClose} from "react-icons/io";
const List = ({token}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProductList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(serverUrl + '/api/product/list');
      const data = response?.data;
      if (data?.success) {
        setList(data?.product);
      }
    }
    catch (error) {
      console.log("Product list fetching error", error);
      toast.error(error?.message);
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductList();
  }, []);

  const handleRemoveProduct=async(item)=>{
    const confirmRemoval=window.confirm
    (`Are you sure that you want to remove ${item?.name}?`);
    if(confirmRemoval){
      try{
       setLoading(true);
       const response=await axios.post(serverUrl+
        '/api/product/remove',{_id:item?._id},
        {headers:{token}}
       )
       const data=response?.data;
       if(data?.success){
         toast.success(data?.message);
         await fetchProductList();
       }
       else {
        toast.error(data?.message);
       }
      }
      catch(error){
        console.log("Product removal Error",error);
        toast.error(error?.message);
      }
      finally{
        setLoading(false);
      }
    }
  }
  return (
    <div>
      {loading ? (<Loader />) : (<>
        <div className="flex items-center
        justify-between">
          <Title>
            Product List
          </Title>
          <Link to={'/add'} className="test-sm
        font-medium hover:text-blue-600 duration-300
        cursor-pointer
        ">Add products</Link>
        </div>
        {list?.length>0 ? (
        <div className="flex flex-col gap-2 mt-2">
          <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr]
           items-center py-1 px-2 border border-gray-300
          text-sm my-1.5">
            <b>Image</b>
            <b>Name</b>
            <b className="hidden md:inline-block">Category</b>
            <b>Price</b>
            <b className="text-center">Action</b>
            <b className="text-center">Edit</b>
          </div>
          {list?.map((item)=>(
            <div key={item?._id}  className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr]
           items-center py-1 px-2 border border-gray-300
          text-sm ">
              <img src={item?.images[0]} alt="productImage" 
              className="w-16 bg-white rounded-sm"/>
              <p className="font-semibold line-clamp-1
              ">{item?.name}</p>
              <p className="hidden md:inline-block font-medium
              ">{item?.category}</p>
              <PriceFormat amount={item?.price}/>
              <div className="flex justify-center">
                <IoMdClose onClick={()=>handleRemoveProduct(item)} 
                className="text-lg cursor-pointer
                hover:text-red-600 duration-300 ease-in-out
                "/>
              </div>
               <Link to={'/add'} className="hover:text-green-600
               duration-300 ease-in-out text-center font-medium
               ">Edit</Link>
            </div>
          ))}
        </div>):
        (<div className="mt-2">
          <p className="mb-4 text-red-600 font-medium
          tracking-wide">You have no products in 
            your Database</p>
            <Link to={'/add'} className="bg-black text-white
            py-2.5 px-4 rounded-md hover:bg-black duration-300
            ease-in-out">
            Add products</Link>
        </div>)}
      </>)}
    </div>
  )
}

export default List;

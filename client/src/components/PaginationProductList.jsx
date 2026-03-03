import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import ProductBanner from "./ProductBanner";
import Pagination from "./Pagination";

const PaginationProductList = () => {

  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
   const [itemsPerPage, setItemsPerPage] = useState(4);
  useEffect(() => {
    try {
      setLoading(true);
      const fetchData = async () => {
        const response = await axios.get(serverUrl + "/api/product/list");
        const data = response?.data;
        if (data?.success) {
          setProducts(data?.product);
          setTotal(data?.total);
        }
        else {
          console.log("Product fetching Error", data?.message);
        }
      }
      fetchData();
    }
    catch (error) {
      console.log("Error", error);

    }
    finally {
      setLoading(false);
    }
  }, []);
 

  const itemsPerPageFormBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  }
 console.log("value",itemsPerPage);
  console.log('value',itemsPerPage);
  return (
    <div className="flex flex-col gap-5 w-full">
      <ProductBanner 
      itemsPerPageFormBanner={itemsPerPageFormBanner}/>
      <Pagination itemsPerPage={itemsPerPage} product={product}/>
    </div>
  );
};

export default PaginationProductList;

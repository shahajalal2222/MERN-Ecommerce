import React, { useState } from "react";
import Product from "./Product";

import ReactPaginateModule from "react-paginate";
const ReactPaginate = ReactPaginateModule.default;


function Items({ currentItems }) {
  return (
    <>
      {currentItems && currentItems?.map((item) =>
        <Product key={item?._id} item={item} />
      )}
    </>
  )
}

const Pagination = ({ itemsPerPage, product }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = product?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(product.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % product.length;
    setItemOffset(newOffset);
    setItemStart(newOffset)
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 
      lg:grid-cols-4 md:gap-5">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col md:flex-row justify-center
      md:justify-between items-center">
       <ReactPaginate
        nextAriaLabel=""
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel=""
        pageLinkClassName="w-9 h-9 border-[1px] border-gray-300
       hover:border-black duration-300 flex items-center
       justify-center"
       pageClassName="mr-3"
       containerClassName="flex text-base font-semibold py-5
       items-center"
       activeClassName="bg-black text-white"
       />
       <p>Products from {itemsPerPage===0 ?1:itemStart}
        to {endOffset} of{" "} {product?.length}
       </p>
      </div>
    </div>
  )
}

export default Pagination

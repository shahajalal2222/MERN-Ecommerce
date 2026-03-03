
import Title from "../components/Title";
import Container from '../components/Container'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import ProductsSideNav from "../components/ProductsSideNav";
import PaginationProductList from "../components/PaginationProductList";

const Shop = () => {


  return (
    <Container>
      <Title>Available products on Sale</Title>
      <div className="mt-5 flex gap-10">
       {/* <div className="w-[20%] lg:w-[25%] hidden md:inline-flex
        h-full">
          <ProductsSideNav/>
        </div>*/}
        <PaginationProductList/>
      </div>
    </Container>
  );
};

export default Shop;
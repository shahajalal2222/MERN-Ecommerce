import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../footer";
import ServicesTag from "../ServicesTag";

const Rootlayout = () => {
  return (
   <>
   <Header/>
   <Outlet/>
   <ServicesTag/>
   <Footer/>
   </>
  );
};

export default Rootlayout;

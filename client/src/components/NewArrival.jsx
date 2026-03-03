import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import SlickSlider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from "./Product";
import PreviousArrow from "./PreviousArrow";
import NextArrow from "./NextArrow";
import Title from './Title';

const Slider = SlickSlider.default ?? SlickSlider;

const NewArrival = () => {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
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
          console.log("Product fetching Error", error);
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


  const settings = {
    infinite: true,
    arrows: true,
    dots: false,

    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow:<NextArrow/>,
    prevArrow:<PreviousArrow/>,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };


  return (
    <div className="w-full py-10">
      <Title className="mb-5">New Arrival</Title>
      {product?.length>0 ?
            <Slider {...settings}>
        {product?.map((item) => (
         <Product key={item?._id} item={item}/>
        ))}
      </Slider>: <div className="w-full h-96
        flex items-center gap-5 mt-4">
        {Array.from({length:4}).map((_,i)=>(
          <div key={i} className="w-full h-full bg-zinc-700
          animate-pulse rounded-md"/>
        ))}
       </div>
      }
    </div>
  )
}

export default NewArrival;

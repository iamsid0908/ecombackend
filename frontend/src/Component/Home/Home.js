import React from 'react'
import { useState } from 'react';
import Slider from "react-slick";
import "./Home.css"

function Home() {
    const cards = [
        { title: "1", imageUrl: "./assets/2.jpeg" ,text:"hi"},
        { title: "2", imageUrl: "./assets/2.jpeg" ,text:"hi"},
        { title: "3", imageUrl: "./assets/2.jpeg" ,text:"gi"},
        { title: "4", imageUrl: "./assets/2.jpeg" ,text:"ghii"},
      ];

     
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    swip:true,
    autoplay:true,
    autoplaySpeed:2000,
    focusOnSelect:true,
    slidesToScroll: 1
  };
  return (
    <>
    <div className='car'>
        <Slider {...settings}>
          
          <div className='a'>
           
            <div className='hi'>Grab Upto 50% off <br></br>in this Sale</div>
          </div>
          <div className='a'>
          <div className='hii'>Grab Upto 50% off <br></br>in this Sale</div>
          </div>
          <div className='a'>
          <div className='hiii'>Grab Upto 50% off <br></br>in this Sale</div>
          </div>
          </Slider>
    </div>
    </>
  )
}
export default Home
import React from 'react'
import "./Products.css"
import ReactStars from "react-rating-stars-component"
// import {Link }from "react-router-dom"

import { Link } from 'react-router-dom';

const options={
  edit:false,
  color:"rgba(20,20,20,0.1)",
  activeColor:"tomato",
  isHalf:true,
  // value:2.5,
  size:window.innerWidth<600?20:25
}

function Products({pro}) {
    

  return (
        <div className='card'>
        <div className='img'>
            <img src='https://i.pinimg.com/564x/bc/4a/7a/bc4a7ab18eaf39db62040d8d27cc79fa.jpg' alt='not' width="200px" height="250px"/>
        </div>
        <div className='name common'>{pro.name}</div>
        <div className='price common'>{pro.price}</div>
        <div className='rating common'>
          <ReactStars {...options} value={pro.ratings}/> <span>({pro.numOfReviews})</span>
        </div>
        <Link to={`/detailsproduct/${pro._id}`}>
        <div className='btn-cart common'>View</div>
        </Link>
        </div>
  )
}

export default Products
// addProductToCart(pro._id,pro.name,pro.price)
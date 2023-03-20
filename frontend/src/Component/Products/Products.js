import React from 'react'
import "./Products.css"

function Products({pro}) {
    // console.log(pro)
  return (
    
        <div className='card'>
        <div className='img'>
            <img src='https://i.pinimg.com/564x/bc/4a/7a/bc4a7ab18eaf39db62040d8d27cc79fa.jpg' alt='not' width="200px" height="250px"/>
        </div>
        <div className='name common'>{pro.name}</div>
        <div className='price common'>{pro.price}</div>
        <div className='rating common'>{pro.rating}</div>
        <div className='btn-cart common'>Add To Cart</div>
        </div>
   
  )
}

export default Products
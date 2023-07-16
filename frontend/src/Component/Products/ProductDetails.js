import React, { useEffect } from 'react'
import "./Products.css"
import ReactStars from "react-rating-stars-component"
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { DataContext } from '../Context/DataContext';
import {useContext } from 'react';


const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    isHalf:true,
    // value:2.5,
    size:window.innerWidth<600?20:25
  }

function ProductDetails() {
    const[product,setProduct]=useState([]);
    const[rating,setRating]=useState("");
    const[comment,setComment]=useState("");
    const[productId,setProductid]=useState("");
    const[user,setUserId]=useState("");
    const params=useParams();
    console.log(params.id)
    const{addProductToCart}=useContext(DataContext);

    useEffect(()=>{
        fetch(`http://localhost:8000/api/product/${params.id}`)
        .then(res=>res.json())
        .then(data=>{
          
          setProduct(data.product)
        })
        setProductid(params.id)
        setUserId(localStorage.getItem("id"))
    },[params.id])
   
   

    console.log(product)

    const realprices=(product.price*20)/100;

    const realprice=product.price+realprices;
    const percent=(100-Math.floor((product.price/realprice)*100)) ;

    const review={rating,comment,productId}
const handleReview=()=>{
  fetch("http://localhost:8000/api/review",{
    method:"PUT",
    body:JSON.stringify(review),
    mode:'cors',
    headers:{
      'Content-Type': 'application/json'
    }

  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data);
    alert("review done")
  })
  .catch(err=>{
    console.log(err)
  })
}

const handleDelete=()=>{
  fetch("http://localhost:8000/api/productdelete",{
    method:"DELETE",
    mode:'cors',
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res=>{
    res.json()
  })
  .then(data=>{
    alert("review delete")
    // window.location.reload()
  })
}
  return (
    <div>
    <div className='deproduct'>
         <div className='deproduct1'>
            <img src="https://i.pinimg.com/564x/bc/4a/7a/bc4a7ab18eaf39db62040d8d27cc79fa.jpg" alt="" height="320px" width="250px"/>
        </div>
        <div className='deproduct2'>
            <h2>{product.name}</h2>
            <div className='ratings'>
            <ReactStars {...options} value={product.ratings}/> 
            <span>({product.numOfReviews})</span>
            </div>
            

            <p className='desc'>{product.description}</p>
            <div className='priced'>
              <p> Rs-{realprice}</p>
            <p className='disprice'>Rs.{product.price}</p>
            <p className='off'>{percent}% off</p>
            </div>
          
            <p className='stock'>Stock-({product.stock})</p>
            <div className='common' onClick={()=>{addProductToCart(product._id,product.name,product.price)}}>Add to cart</div>
        </div>
    </div>
    <div className='writeReview1'>
      <div className='writeReview'>
        <label className='stars'>Stars</label>
        <input type="number" onChange={(e)=>{setRating(e.target.value)}} className='instars'/>
        <label className='com'>Comment</label>
        <textarea className='incom' rows="4" cols="50" onChange={(e)=>{setComment(e.target.value)}}></textarea>

        <p onClick={handleReview} className='post-btn'>Post</p>
      </div>
    </div>
    <div>

      {product.reviews && product.reviews.map(item=>(
        <>
        <div className='review'>
        <p className='p1'>{item.name}</p>
        <p className='p2'>{item.comment}</p>
        <ReactStars {...options} value={item.rating} /> 
      
          {
         (item.user===user)?(
          <button onClick={handleDelete}>Detele</button>
         ):(
          <div></div>
         )

          }
          
        
        </div>
        
        </>
        ))} 
    </div>
    </div>
  )
}

export default ProductDetails
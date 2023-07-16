import React from 'react'
import {useEffect ,useState} from 'react';
import "./Detailorder.css"
import { useParams } from 'react-router-dom';

function Detailorder() {
 
  const params=useParams();
  
  const[detailorder,setDetailorder]=useState([])
  
  console.log(params.id)

  useEffect(() => {
    fetch(`http://localhost:8000/api/getorder/${params.id}`)
    .then(res=>res.json())
    .then(data=>{
      // console.log(data);
      setDetailorder(data.order)
    })
    
  }, [params.id])
  

  return (
    <div className='dorders'>
     
      <div>
        <div>
          <h2>Address</h2>
          {detailorder && detailorder.shippingInfo && (
            <>
          <p> <b>Address-</b>{detailorder && detailorder.shippingInfo.address}</p>
          <p> <b>City -</b>{detailorder &&detailorder.shippingInfo.city}</p>
          <p> <b>State-</b>State-{detailorder &&detailorder.shippingInfo.state}</p>
          <p> <b>Phone No-</b>{detailorder &&detailorder.shippingInfo.phoneNo}</p>
          <p> <b>Pincode-</b>{detailorder && detailorder.shippingInfo.pinCode}</p>
          <p> <b>Country-</b>{detailorder && detailorder.shippingInfo.country}</p>
          </>
          )}
        </div>
        <div>
          <h2>Price Details</h2>
          <p><b>Order Status-</b>{detailorder && detailorder.orderStatus}</p>
          <p><b>ItemPrice-</b>{detailorder && detailorder.itemsPrice}</p>
          <p><b>Shipping Price-</b>{detailorder && detailorder.shippingPrice}</p>
          <p><b>Total Price-</b>{detailorder && detailorder.totalPrice}</p>
        </div>
        <h2>Products</h2>
        {detailorder && detailorder.orderItems && detailorder.orderItems.map(items=>(
                       <>
                        <div className='name1'>
                        <img src="https://i.pinimg.com/564x/bc/4a/7a/bc4a7ab18eaf39db62040d8d27cc79fa.jpg" width="70px" height="70px" alt=""/>
                      <p className='pro-name'> {items.name}</p>
                      <p className='pro-price'> Rs.{items.price}</p>
                      <p className='pro-quan'> Quantity: {items.quantity}</p>
                      </div>
                        </>
                      
       ))} 
         <button className='view-details'> Cancel order</button> 
       </div> 
    </div>
  )
}

export default Detailorder
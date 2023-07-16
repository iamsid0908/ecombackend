import React from 'react'
import "./Myorder.css"
import { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';

function Myorders() {
  const[orderss,setOrders]=useState([]);


  useEffect(() => {
    fetch("http://localhost:8000/api/myorder",)
    .then(res=>res.json())
    .then(data=>{
     
      setOrders(data.orders);
    })
    .catch(err=>{
      console.log(err)
    })
  }, [])
  
  
  
  return (
    <div className='myorders'>
        <div>
            <h1>My Orders</h1>
            <div>
              <div className='orderele'>
                
                {Array.from(orderss).map(item=>(
                    <div>
                      <div className='order-name'>                     
                      {item.orderItems.map(items=>(
                        <>
                        <div className='name1'>
                        <img src="https://i.pinimg.com/564x/bc/4a/7a/bc4a7ab18eaf39db62040d8d27cc79fa.jpg" width="70px" height="70px" alt=""/>
                      <p className='pro-name'> {items.name}</p>
                      <p className='pro-price'> Rs.{items.price}</p>
                      <p className='pro-quan'> Quantity: {items.quantity}</p>
                      </div>
                        </>
                      
                      ))}
                      <div className='order-lower'>
                        <div className='total-price'>
                      <p> <b>Total Price: Rs. </b>{item.totalPrice}</p>
                      <p> <b>Status-  </b>{item.orderStatus}</p>
                      <p> <b>Delivery Expected:: </b>{item.paidAt}</p>
                      </div>
                      <div>
                        <Link to={`/detailorder/${item._id}`} >
                        <button className='view-details' >View Details</button>
                        </Link>
                      </div>
                      </div>
                      </div>
                      <div className='order-status'>

                      </div>
                      <div className="order-delivery">

                      </div>
                    </div>
                ))}
              </div>
            </div>
        </div>
    </div>
  )
}

export default Myorders
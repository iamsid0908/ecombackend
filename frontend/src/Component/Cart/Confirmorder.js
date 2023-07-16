import React from 'react'
import "./Confirmorder.css"
import { DataContext } from '../Context/DataContext';
import {useContext ,useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Confirmorder() {
  const navigate=useNavigate();
    const{ cartItems, removeFromCart}=useContext(DataContext);
    const[name,setName]=useState("");
    const[phone,setPhone]=useState(0);
    const[address,setAddress]=useState("");
    const[pricee,setPricee]=useState(0)
    useEffect(() => {
      let a=0;
      cartItems.map((item)=>{
        a=a+item.price
        setPricee(a);
       }) 
        setName(localStorage.getItem("name"))
        setPhone(localStorage.getItem("phoneno"))
        setAddress(localStorage.getItem("address"))  

        
        // sessionStorage.setItem("")
    }, [cartItems])
    sessionStorage.setItem("pricee",pricee)
    
    const handlePay=()=>{
      if(cartItems.length===0){
        alert("your cart is empty")
        return navigate("/")
      }
     navigate("/paymentconfirm")
    }
  return (
    <div className='confi'>
    <div className='confirmorder'>
        <div className='confirm'>
            <h2 className='ship'>Shipping Info</h2>
            <p className='ship-info'> <b>Name:</b> {name}</p>
            <p className='ship-info'><b>Phone:</b>  {phone}</p>
            <p className='ship-info'> <b>Address:</b> {address}</p>


        </div>
        <div className='yr-cart'>
          <p>Your Cart Items</p>
          {cartItems.map((items)=>(
            <div className='con-cart'>
              <img src="https://i.pinimg.com/564x/bc/4a/7a/bc4a7ab18eaf39db62040d8d27cc79fa.jpg" width="100px" height="100px"/>
              <p>{items.name}</p>
              <p className='price'>{items.price}</p>
            </div>
          ))}
        </div>
    </div>
    <div className='order'>
      <p className='order-para'>Order Summary</p>
      <p className='o-para'>SubTotal- Rs.{pricee}</p>
      <p className='o-para'> Shipping Charges-Rs.0</p>
      <p className='o-para'>GST-Rs.0</p>
      <p className='o-para'>Total-Rs.{pricee}</p>
      <button className='pro-btn' onClick={handlePay}>Proceed to Pyment</button>
    </div>
    </div>
  )
}

export default Confirmorder
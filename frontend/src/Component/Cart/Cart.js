import React from 'react'
import { DataContext } from '../Context/DataContext';
import {useContext } from 'react';
import { useState ,useEffect} from 'react';
import "./Cart.css"
import LocalMallIcon from '@mui/icons-material/LocalMall';
import {useNavigate} from "react-router-dom"


function Cart() {
  const navigate = useNavigate();
  const [quantity,setQuantity]=useState(0);
  const[namec,setNamec]=useState("");
    const{ cartItems, removeFromCart}=useContext(DataContext);
    useEffect(() => {
      let a=0;
      cartItems.map((item)=>{
        a=a+item.price
       return  setQuantity(a);
        
       }) 
       setNamec(localStorage.getItem("name"))
    }, [cartItems])
    
    console.log(cartItems)
    
    const handleCheck=(e)=>{
      e.preventDefault();

      if(cartItems.length===0){
        alert("your cart is empty")
        return navigate("/")
      }

      {namec? navigate("/address"):navigate("/login")}
    }
  return (
    <div className='cart-parent'>
      <p className='cart-icon'><LocalMallIcon/> Cart</p>
        <div className='cart-list'>
        {cartItems.map((item) => (
         <div className='cart-items'>
            <div className='cart-left'>
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                </div>
              <div className='cart-right'>
                <button onClick={()=>{removeFromCart(item.id)}} className='rem-btn'>Remove</button>
            </div>
         </div>
        ))}
        <div className='chekout-sec'>
        <h2 className='tprice'>Total price- {quantity}</h2>
        <p className='check' onClick={handleCheck}>Check-Out</p>
        </div>
       
      </div>
    </div>
  )
}

export default Cart
import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Address.css"
import {useContext } from 'react';
import { DataContext } from '../Context/DataContext';


function Address() {
  const navigate=useNavigate();
  const[address,setAddress]=useState("");
  const[city,setCity]=useState("");
  const[pincode,setPincode]=useState(0);
  const[phoneno,setPhoneno]=useState(0);
  const[state,setState]=useState("");
  const[country,setCountry]=useState("");
  const[namea,setNamea]=useState("");

  const{ cartItems}=useContext(DataContext);

  useEffect(() => {
    setNamea(localStorage.getItem("name"))
  }, [])
  
 
  localStorage.setItem("address", address);
  localStorage.setItem("city", city);
  localStorage.setItem("pincode", pincode);
  localStorage.setItem("phoneno", phoneno);
  localStorage.setItem("state", state);
  localStorage.setItem("country", country);

  const handleAddress=()=>{
    if(cartItems.length===0){
      alert("your cart is empty")
      return navigate("/")
    }
    {namea? navigate("/confirmorder"):navigate("/login")}
  }

  return (
    <div className='address'>
        <div className='address-ele'>
            <label className='add-l'>Address</label>
            <input type='text' placeholder='address' className='add-i' onChange={(e)=>{
              setAddress(e.target.value)
            }}/>

            <label className='add-l'>City</label>
            <input type='text' placeholder='City' className='add-i'onChange={(e)=>{
              setCity(e.target.value)
            }}/>

            <label className='add-l'>Pin-code</label>
            <input type='number' placeholder='Pin-code' className='add-i' onChange={(e)=>{
              setPincode(e.target.value)
            }}/>

            <label className='add-l'>PhoneNo</label>
            <input type='number' placeholder='Phone-No' className='add-i'onChange={(e)=>{
              setPhoneno(e.target.value)
            }}/>

            <label className='add-l'>State</label>
            <input type='text' placeholder='State' className='add-i' onChange={(e)=>{
              setState(e.target.value)
            }}/>

            <label className='add-l'>Country</label>
            <input type='text' placeholder='Country' className='add-i' onChange={(e)=>{
              setCountry(e.target.value)
            }}/>
            <button className="sub-btn" onClick={handleAddress}>Submit</button>
        </div>

    </div>
  )
}

export default Address
import React from 'react'
import "./Confirmpayment.css"
import { DataContext } from '../Context/DataContext';
import {useContext,useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Confirmpayment() {
    const navigate=useNavigate();
    const{ cartItems}=useContext(DataContext);
    
    const[address,setAddress]=useState("");
    const[phoneNo,setPhone]=useState(0);
    const[city,setCity]=useState("");
    const[pinCode,setPincode]=useState(0);
    const[country,setCountry]=useState("");
    const[state,setState]=useState("");
    const[pricei,setPricei]=useState(0);
    
    useEffect(()=>{
        setAddress(localStorage.getItem("address"));
        setPhone(localStorage.getItem("phoneno"))
        setCity(localStorage.getItem("city"))
        setPincode(localStorage.getItem("pincode"))
        setState(localStorage.getItem("state"))
        setCountry(localStorage.getItem("country"))
        setPricei(sessionStorage.getItem("pricee"))
    },[])

    const shippingInfo={
        address,
        phoneNo,
        city,
        pinCode,
        country,
        state
    }
    console.log(cartItems)
    const order = {
        shippingInfo,
        orderItems:cartItems,
        itemsPrice:pricei,
        taxPrice:0,
        shippingPrice:0,
        totalPrice:pricei

    }
    console.log(order)
    const handleOrder=(e)=>{
        e.preventDefault();
        
        fetch("http://localhost:8000/api/postorder",{
            method:"POST",
            body:JSON.stringify(order),
            mode:'cors',   
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(data=>data.json())
        .then((data)=>{
            if(data.sucess!==false){
            alert("sucess");
            navigate("/myorders")
            }else{
                alert("err")
            }
        })
        .catch((err)=>{
            console.log(err);
            alert("err");
        })
    }

  return (
    <div className='confirmpayment'>
        <div> Total price :{pricei}</div>
        <button onClick={handleOrder}>Complete Order</button>
    </div>
  )
}

export default Confirmpayment
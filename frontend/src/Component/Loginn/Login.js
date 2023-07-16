import React from 'react'
import "./Login.css"
import { DataContext } from '../Context/DataContext';
import {useContext ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import  Cookies  from 'universal-cookie';
function Login() {

    const navigate = useNavigate();
    const{email,password,setEmail,setPassword}=useContext(DataContext);
     const user={email,password}
     const[token,setToken]=useState("");
     const cookies = new Cookies();
    const handleLogin=(e)=>{
        e.preventDefault();
        
        fetch("http://localhost:8000/api/login",{
            method:"POST",
            body:JSON.stringify(user),
            mode:'cors',   
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(data=>data.json())
        .then((data)=>{
            if(data.success!==false){
                console.log(data.token)
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("name",data.user.name)
            localStorage.setItem("avater",data.avatar)
            localStorage.setItem("id",data.user._id)
            console.log(data.user);
            console.log("good");
            
            alert("sucess");

            navigate("/");
            window.location.reload(false);
            }else{
                alert("err")
            }
        })
        .catch((err)=>{
            console.log(err);
            alert("err");
        })
    }
   
    
   
    console.log( cookies.get('token'));

   

  return (
    <div className='login1-form'>
        <div className='login-data'>
            <label>Email</label>
            <input type="email" placeholder='Email' onChange={(e)=>{
                setEmail(e.target.value);
            }}/>
            <label>Password</label>
            <input type="password" placeholder='Password' onChange={(e)=>{
                setPassword(e.target.value)
            }}/>
            <button className='resgister-btn' onClick={handleLogin}>Sign-in</button>
        </div>
    </div>
  )
}

export default Login
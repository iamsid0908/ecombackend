import React   from 'react'
import "./Register.css"
import { DataContext } from '../Context/DataContext';
import {useState,useContext } from 'react';
import Axios from "axios"
function Register() {

    
    const [avatar,setAvatar]=useState("")
    const{resname,
        setResname,
        resemail,
        setResemail,
        respassword,
        setRespassword}=useContext(DataContext);
    
    // const user={email,password}

    // const handleLogin=(e)=>{
    //     e.preventDefault();
    //     console.log(user);
    //     fetch("http://localhost:8000/api/login",{
    //         method:"POST",
    //         body:JSON.stringify(user),
    //         mode:'cors',   
    //         headers:{
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(data=>data.json())
    //     .then((data)=>{
    //         if(data.success!==false){
    //         localStorage.setItem("jwt",data.token)
    //         console.log(data.user);
    //         console.log("good");
    //         alert("sucess");
    //         }else{
    //             alert("err")
    //         }
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //         alert("err");
    //     })
    // }
   
    

    const upload=(file)=>{
        console.log(file);
        const formdata=new FormData()
        formdata.append("file",file)
        formdata.append("upload_preset","tiu4wvzu")
    
        Axios.post("https://api.cloudinary.com/v1_1/dnbiefjjx/image/upload",formdata)
        .then(res=>{
          console.log(res.data.url)
          setAvatar(res.data.url);
        })
      }
      const user2={name:resname,email:resemail,password:respassword,avatar};
      
      const handle2=(e)=>{
        console.log(user2);
        e.preventDefault();
        fetch("http://localhost:8000/api/register",{
            method:"POST",
            body:JSON.stringify(user2),
            mode:'cors',   
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(data=>data.json())
        .then((data)=>{
            if(data.success!==false){
            console.log(data);
            alert("you are registered");
            }else{
                alert("credential are wrong");
            }
        })
        .catch((err)=>{
            console.log(err);
            alert("err");
        })
    }

  return (
    <>
    <div className='login-form'>
        <div className='form-data'>
        <label>Name</label>
        <input type="text" placeholder='name' onChange={(e)=>{
            setResname(e.target.value);
        }}/>
        <label>Email</label>
        <input type="email" placeholder='email' onChange={(e)=>{
            setResemail(e.target.value)
        }}/>
        <label>password</label>
        <input type="password" placeholder='password' onChange={(e)=>{
            setRespassword(e.target.value);
        }}/>
        <input type="file" onChange={(e)=>{upload(e.target.files[0])}}/>
        
        <button className='resgister-btn' onClick={handle2}>register</button>

        <p>Forgotten password</p>
        <p>Sing-up</p>

        {/* <img src={avatar} width="100px" height="100px" alt=''/> */}
    </div>
    </div>
    </>
  )
}

export default Register
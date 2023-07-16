import React   from 'react'
import "./Register.css"
import { DataContext } from '../Context/DataContext';
import {useContext } from 'react';
import Axios from "axios"
import{Link,useNavigate} from "react-router-dom"
function Register() {

    
    const navigate = useNavigate();
    const{resname,
        setResname,
        resemail,setResemail,
        respassword,setRespassword,
        avatar,setAvatar,
        
                 
    }=useContext(DataContext);
    
    
    

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
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("name",data.user.name)
            localStorage.setItem("avatar",data.user.avatar)
            localStorage.setItem("id",data.user._id)
            navigate("/");
            alert("you are registered");
            window.location.reload(false);
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
        <Link to="/login"><p>Sing-up</p> </Link>
        

        {/* <img src={avatar} width="100px" height="100px" alt=''/> */}
    </div>
    </div>
    </>
  )
}

export default Register
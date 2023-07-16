import React, {  useEffect} from 'react'
import "./Header.css"
import { DataContext } from '../Context/DataContext';
import {useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Header({openSidebar}) {


  const{setName1,setAvatar1,setJwt,name1,jwt,avatar1}=useContext(DataContext);


  useEffect(() => {
    setName1(localStorage.getItem("name"));
    setAvatar1(localStorage.getItem("avatar"));
    setJwt(localStorage.getItem("jwt"));
  }, [])
  
  
  
  const handleLogout=()=>{
    localStorage.clear();
    setJwt("");
    
  }
  return (
    <div className='header'>
      <div className='menu'>
       
      <MenuIcon onClick={openSidebar} className="menu-btn"/>
        
      
     
        {!jwt ?
        <Link style={{textDecoration: 'none'}} to="/register"><p className="l2">Log-in</p></Link>
        :
        <div className='credentials'>
          <h5>{name1}</h5>
          <img src={avatar1} alt="" className='avatar'/>
          <p onClick={handleLogout}>Logout</p>
        </div>
        }
        </div>
    </div>
  )
}

export default Header
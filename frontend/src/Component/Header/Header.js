import React from 'react'
import {ReactNavbar} from "overlay-navbar"
import "./Header.css"

function Header() {
  return (
    <div className='header'>
        <ul className='left'>
          <li><img src='./assets/ecom.png' width="50px" height="50px"/></li>
        </ul>
        <div className='search'> <input type="text" placeholder='Search'/> </div>
        
          <ul className='right'>
            
            <li>Blog</li>
            <li>Product</li>
            <li>SignUp</li>
          </ul>
        
    </div>
  )
}

export default Header
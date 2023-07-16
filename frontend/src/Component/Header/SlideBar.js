import React from 'react'
import "./Header.css"
import HomeIcon from '@mui/icons-material/Home';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { DataContext } from '../Context/DataContext';
import {useContext } from 'react';


function SlideBar({sidebar}) {

    const{ cartItems, removeFromCart}=useContext(DataContext);
  return (
    <div className={sidebar? "slidebar slidebar--open":"sidebar done"}>
        <ul>
        <Link style={{textDecoration: 'none'}} to="/"> <li>{<HomeIcon className='icon'/>}Home</li></Link>
           
            <li>{<ProductionQuantityLimitsIcon className='icon'/>}Product</li>
            <Link style={{textDecoration: 'none'}} to="/myorders"><li>{<BookmarkBorderIcon className='icon'/>}My-Order</li> </Link>

            <Link style={{textDecoration: 'none'}} to="/register"> <li>{<PersonIcon className='icon'/>}Sing-up</li></Link>
            <Link style={{textDecoration: 'none'}} to="/cart"><li>{<ShoppingCartIcon className='icon'/>}Cart {cartItems.length}</li></Link>
        </ul>
    </div>
  )
}

export default SlideBar
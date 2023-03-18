import React from 'react'
import "./Header.css"
import HomeIcon from '@mui/icons-material/Home';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
function SlideBar({sidebar}) {
    console.log(    sidebar);
  return (
    <div className={sidebar? "slidebar slidebar--open":"sidebar done"}>
        <ul>
            <li>{<HomeIcon className='icon'/>}Home</li>
            <li>{<ProductionQuantityLimitsIcon className='icon'/>}Product</li>
            <li>{<BookmarkBorderIcon className='icon'/>}My-Order</li>
            <li>{<PersonIcon className='icon'/>}Sing-up</li>
            <li>{<ShoppingCartIcon className='icon'/>}Cart</li>
        </ul>
    </div>
  )
}

export default SlideBar
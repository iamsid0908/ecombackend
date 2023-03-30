import React from 'react'
import "./Header.css"
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Header({openSidebar}) {
  return (
    <div className='header'>
      <div className='menu'>
      <MenuIcon onClick={openSidebar} className="menu-btn"/>
        {/* <button onClick={openSidebar} className=""> btn</button> */}
        <p>
          <img src='./assets/ecom.png' alt='ni' width="30px" height="30px"/>
          
        </p>
        <Link style={{textDecoration: 'none'}} to="/login"><p className="l2">Log-in</p></Link>
        {/* <p>Login</p> */}
        </div>
    </div>
  )
}

export default Header
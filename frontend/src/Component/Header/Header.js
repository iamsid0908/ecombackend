import React from 'react'
import "./Header.css"
import MenuIcon from '@mui/icons-material/Menu';

function Header({openSidebar}) {
  return (
    <div className='header'>
      <div className='menu'>
      <MenuIcon onClick={openSidebar} className="menu-btn"/>
        {/* <button onClick={openSidebar} className=""> btn</button> */}
        <p>
          <img src='./assets/ecom.png' alt='ni' width="30px" height="30px"/>
        </p>
        </div>
    </div>
  )
}

export default Header
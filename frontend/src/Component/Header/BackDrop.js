import React from 'react'
import "./Header.css"
function BackDrop({sidebar,closeSidebar}) {
  return (
    <div className={sidebar? "backdrop backdrop--open":"backdrop"} onClick={closeSidebar}></div>
  )
}

export default BackDrop

import './App.css';
import Header from './Component/Header/Header';
import Home from "./Component/Home/Home"
import {BrowserRouter as Router} from "react-router-dom";
import SlideBar from './Component/Header/SlideBar';
import BackDrop from './Component/Header/BackDrop';
import { useState } from 'react';
function App() {

  const[sidebar,setSidebar]=useState(false);
  const toggleSideBar=()=>{
    setSidebar((prevState)=>!prevState);
  }
  return (
    <Router>
      <Header openSidebar={toggleSideBar}/>
      <BackDrop sidebar={sidebar} closeSidebar={toggleSideBar}/>
      <SlideBar sidebar={sidebar}/>
      <Home/>
    </Router>
  );
}

export default App;

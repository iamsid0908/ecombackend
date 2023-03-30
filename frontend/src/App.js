import './App.css';
import Header from './Component/Header/Header';
import Home from "./Component/Home/Home"
import SlideBar from './Component/Header/SlideBar';
import BackDrop from './Component/Header/BackDrop';
import { useState ,useEffect} from 'react';
import Register from './Component/Login/Register';
import { DataContext } from './Component/Context/DataContext';
import {Route,Routes}from 'react-router-dom';


var allData=[];
function App() {
  const [data, setData] = useState([]);
  const[spinner,setSpinner]=useState(false);
  const [input,setInput]=useState("");
  const [price , setPrice]=useState(400);
  const[sidebar,setSidebar]=useState(false);
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[resname,setResname]=useState("");
  const[respassword,setRespassword]=useState("");
  const[resemail,setResemail]=useState("");

  const toggleSideBar=()=>{
    setSidebar((prevState)=>!prevState);

  }

  useEffect(() => {
    fetch("http://localhost:8000/api/product")
    .then(res=>res.json())
    .then(data1=>{
      allData=data1;
      setData(data1);
      setSpinner(true);
    })
  
}, [])
  return (
    <>
     
      <Header openSidebar={toggleSideBar}/>
      <BackDrop sidebar={sidebar} closeSidebar={toggleSideBar}/>
      <SlideBar sidebar={sidebar}/>
     
     
      <DataContext.Provider value={{data,setData,input,setInput,price,setPrice,allData
      ,spinner,setSpinner
      ,email,
      setEmail,
      password,
      setPassword,
      resname,setResname,
      resemail,setResemail,
      respassword,setRespassword
      }}>
    <Routes> 
      <Route path ="/" element={<Home/>}/>
      <Route path ="/login" element={<Register/>}/>
      </Routes>
      </DataContext.Provider>
    
    </>
  );
}

export default App;

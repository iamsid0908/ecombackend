import './App.css';
import Header from './Component/Header/Header';
import Home from "./Component/Home/Home"
import SlideBar from './Component/Header/SlideBar';
import BackDrop from './Component/Header/BackDrop';
import { useState ,useEffect} from 'react';
import Register from './Component/Login/Register';
import { DataContext } from './Component/Context/DataContext';
import {Route,Routes}from 'react-router-dom';
import Login from './Component/Loginn/Login';
import Cart from './Component/Cart/Cart';
import Address from './Component/Cart/Address';
import Confirmorder from './Component/Cart/Confirmorder';
import Confirmpayment from './Component/Cart/Confirmpayment';
import Myorders from './Component/Orders/Myorders';
import Detailorder from './Component/Orders/Detailorder'
import ProductDetails from './Component/Products/ProductDetails';
var allData=[];



function App() {
  
  const [data, setData] = useState([]);
  const[spinner,setSpinner]=useState(false);
  const[input,setInput]=useState("");
  const[price , setPrice]=useState(400);
  const[sidebar,setSidebar]=useState(false);
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[resname,setResname]=useState("");
  const[respassword,setRespassword]=useState("");
  const[resemail,setResemail]=useState("");
  const[avatar,setAvatar]=useState("");
  const[name1,setName1]=useState("")
  const[avatar1,setAvatar1]=useState("");
  const[jwt,setJwt]=useState("");
  const[detailorder,setDetail]=useState([]);
  
  const [totalPrice, setTotalPrice] = useState(0);

  

  
  const toggleSideBar=()=>{
    setSidebar((prevState)=>!prevState);

  }

  // const handleView=(id)=>{
  //   fetch(`http://localhost:8000/api/getorder/${id}`)
  //   .then(res=>res.json())
  //   .then(data2=>{
      
  //     setDetail(data2.order);
  //     navigate("/detailorder")
  //   })
  // }


  useEffect(() => {
    fetch("http://localhost:8000/api/product")
    .then(res=>res.json())
    .then(data1=>{
      allData=data1;
      setData(data1);
      setSpinner(true);
    })
    
}, [])


const [cartItems, setCartItems] = useState([]);

const addProductToCart = (itemId,name,price) => {
  const newCartItems = [...cartItems, { id: itemId, quantity:1,name:name,price:price }];
  setCartItems(newCartItems);
  setTotalPrice(totalPrice + data.price);
  alert("added to yr cart")
};

const removeFromCart = (itemId) => {
  const newCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(newCartItems);
    setTotalPrice(totalPrice - data.price);
};


// const getTotalPrice = () => {
//   return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
// };




  return (
    <>
    <DataContext.Provider value={{data,setData,input,setInput,price,setPrice,allData
      ,spinner,setSpinner
      ,email,
      setEmail,
      password,
      setPassword,
      resname,setResname,
      resemail,setResemail,
      respassword,setRespassword,
      avatar,setAvatar,
      name1,setName1,
      jwt,setJwt,
      avatar1,setAvatar1,
      addProductToCart,removeFromCart,
      cartItems, setCartItems,
      totalPrice, setTotalPrice,
      detailorder,setDetail,
      }}>

      <Header openSidebar={toggleSideBar}/>
      <BackDrop sidebar={sidebar} closeSidebar={toggleSideBar}/>
      <SlideBar sidebar={sidebar}/>
         {/* <Try/> */}
    <Routes> 
      <Route path ="/" element={<Home/>}/>
      <Route path ="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/address" element={<Address/>}/>
      <Route path="/confirmorder" element={<Confirmorder/>}/>
      <Route path="/paymentconfirm" element={<Confirmpayment/>}/>
      <Route path="/myorders" element={<Myorders/>}/>
      <Route path= "/detailorder/:id" element={<Detailorder/>}/>
      <Route path ="/detailsproduct/:id" element={<ProductDetails/>}/>
      </Routes>
      </DataContext.Provider>
    
    </>
  );
}

export default App;

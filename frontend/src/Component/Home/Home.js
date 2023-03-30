import React from 'react'
import {useContext} from 'react';
import Slider from "react-slick";
import Products from '../Products/Products';
import "./Home.css"
import SearchIcon from '@mui/icons-material/Search';
import { DataContext } from '../Context/DataContext';
import Spinnerr from '../Common/Spinnerr';



function Home() {
  const {setData,
    setInput,
    setPrice,
    allData,
    input,
    price,
    data,
    spinner}=useContext(DataContext);
  const handle=async()=>{
    if(input===""){
      return;
    }
  fetch(`http://localhost:8000/api/product/filter/${input}`)
  .then(res=>res.json())
  .then(data2=>{
    setData(data2)
  })
}
  
const handlePrice=(e)=>{
  setPrice(e.target.value);
  const findPrice=e.target.value;
  console.log(findPrice);
  const pricedata=allData.filter((Dress)=>{
    return Dress.price<=findPrice;
 })
 setData(pricedata);
 setPrice(findPrice);
}
  
    const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    swip:true,
    autoplay:true,
    autoplaySpeed:2000,
    focusOnSelect:true,
    slidesToScroll: 1
  };

  
 
  return (
    <>
    <div className='search'>
      <div className='search-ele'>
        <input type="text" placeholder='Search' onChange={(e)=>{
          setInput(e.target.value);
        }}/>
        <SearchIcon onClick={handle}/>
      </div>
    </div>


    <div className='car'>
        <Slider {...settings}>
          
          <div className='a'>
          <div className='hi'>Grab Upto 50% off <br></br>in this Sale</div>
          </div>
          <div className='a'>
          <div className='hii'>Grab Upto 50% off <br></br>in this Sale</div>
          </div>
          <div className='a'>
          <div className='hiii'>Grab Upto 50% off <br></br>in this Sale</div>
          </div>
          </Slider>
    </div>

    <div className='price-filter'>
      <div>
      <h3>Price Range</h3>
          <input type="range"  min="400" max="19000" onInput={handlePrice}  value={price}/>
          <p>Price Rs.{price}</p>
      </div>
    </div>
    
    {!spinner?
    <div className='spinner'>
      <Spinnerr/>
    </div>:
    <div className='products'>
      {data.map(pro=>(
        <Products pro={pro}/>
      ))}
    </div>
    }
    </>
  )
}
export default Home
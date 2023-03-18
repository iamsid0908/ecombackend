import React from 'react'
import { useEffect ,useState} from 'react';
import Slider from "react-slick";
import Products from '../Products/Products';
import "./Home.css"
import SearchIcon from '@mui/icons-material/Search';

function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/product")
    .then(res=>res.json())
    .then(data1=>{
      // console.log(data1);
      setData(data1);
    })
  }, [])
  // console.log(data);
  
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
        <input type="text" placeholder='Search'/>
        <SearchIcon/>
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
    <div className='products'>
      {data.map(pro=>(
        <Products pro={pro}/>
      ))}
    </div>
    </>
  )
}
export default Home
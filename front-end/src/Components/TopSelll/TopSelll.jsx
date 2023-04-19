 import React, { useEffect ,useRef} from 'react'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap,Power3 } from "gsap"
 import './TopSelll.css'
 import { Box } from '../../Data/Box'
import TopSelBox from '../TopSelBox/TopSelBox'

const boxSlice = Box.slice(0,9)
 
 function TopSelll() {
  gsap.registerPlugin(ScrollTrigger);
    
    const cardContainer = useRef();
    useEffect(() => {
      gsap.to(cardContainer.current,{x:0,delay:0.2,opacity:1,duration:1,ease:Power3.easeOut,scrollTrigger:cardContainer.current})
    }, [])
   return (
     <div className='topSell-container' >
      <div className="top-Sell-title">
        <h4>Top Selling Products</h4>
      </div>
      <div className='topSell-content' ref={cardContainer} >
      {
        boxSlice.map((i,key)=>(



          <TopSelBox
          key={i.id}
          name={i.name}
          picture={i.image}
          price={i.price}
          />
     
        ))
      }
      </div>


     </div>
   )
 }
 
 export default TopSelll
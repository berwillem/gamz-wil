import React from 'react'
import './PubManage.css'
import Navbar from '../../Components/Navbar/Navbar'
import SliderPubManage from '../../Components/SliderPubManage/SliderPubManage'



function PubManage() {
   
  return (
    <div>
        <Navbar  />
            <SliderPubManage disp={true}/>
        
    </div>
  )
}

export default PubManage
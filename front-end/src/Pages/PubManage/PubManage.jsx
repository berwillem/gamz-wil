import React from 'react'
import './PubManage.css'
import Navbar from '../../Components/Navbar/Navbar'
import Slider from '../../Components/Slider/Slider'



function PubManage(isDarkMode) {
    const p=isDarkMode.isDarkMode
  return (
    <div>
        <Navbar p={p} />
            <Slider disp={true}/>
        
    </div>
  )
}

export default PubManage
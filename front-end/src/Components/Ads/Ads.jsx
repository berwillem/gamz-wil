import React from 'react'
import './Ads.css'
import pubImg from '../../assets/images/pub.png'
function Ads({uri}) {
  return (
    <div className='Ads-container'>
      <img src={pubImg} alt="" />
    </div>
  )
}

export default Ads
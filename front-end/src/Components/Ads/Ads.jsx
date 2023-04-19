import React from 'react'
import './Ads.css'

function Ads({uri}) {
  return (
    <div className='Ads-container'>
      <img src={uri} alt="" />
    </div>
  )
}

export default Ads
import React from 'react'
import './TopSelBox.css'



function TopSelBox({picture ,name ,price}) {
  return (
    <div className='Top-sal-box-container'>

        <div className="sal-box-L">
            <img src={picture ?   picture :'file not fond '} alt="" id='box-image' />
        </div>
        <div className="sal-box-R">
            <div className="box-name">
                <strong>{name}</strong>
            </div>
            <div className="box-price">
                <small>{price}</small>
            </div>
        </div>
        

    </div>
  )
}

export default TopSelBox
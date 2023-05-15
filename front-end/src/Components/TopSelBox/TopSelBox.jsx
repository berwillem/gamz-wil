import React from 'react'
import './TopSelBox.css'
import { Link } from 'react-router-dom'


function TopSelBox({i}) {
   
  return (
    <div className='Top-sal-box-container'>

       <Link to={`/postDetails/${i._id}`}>
       <div className="sal-box-L">
            <img src={i.images[0].url ?   i.images[0].url :'file not fond '} alt="" id='box-image' />
        </div>
        <div className="sal-box-R">
            <div className="box-name">
                <strong>{i.title}</strong>
            </div>
            <div className="box-price">
                <small>{i.price} da</small>
            </div>
        </div>
       </Link>
        

    </div>
  )
}

export default TopSelBox
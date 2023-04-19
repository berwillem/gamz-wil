import React from 'react'
import { BsDiscord, BsFacebook, BsInstagram, BsWhatsapp } from 'react-icons/bs'
import Logo from  '../../assets/1.png'
import Logo2 from  '../../assets/2.png'
import './Footer.css'

function Footer({p}) {
   
  return (
   <div className="footer-container">
    <div className="footer-content">
        <div className="L-footer">
            <div className="logo-footer">
                <img src={p ? Logo2 : Logo} alt="" />
            </div>
            <div className="social-media">
                <BsInstagram size={20} color='#757575'/>
                <BsFacebook  size={20} color='#757575'/>
                <BsDiscord  size={20} color='#757575' />
                {/* <BsDiscord  size={20} color='#757575' />   twitter */}
            </div>
                 
        </div>
        <div className="categories">
            <div className="title-category">
                <strong>Categories</strong>
            </div>
            <div className="category-list">
            <li>Informatique</li>
            <li>Consoles</li>
            <li>Jeux Vidéos </li>
            <li>Contenu Digital</li>
            </div>
        </div>
        <div className="R-footer">
            <li>About us

</li>
            <li>Contact
</li>
            <li>FAQ</li>
        </div>

    </div>
    <div className="copy-right">
        <p> @ <strong>Gamz</strong>- All Rights Reserved</p>
    </div>
   </div>
  )
}

export default Footer
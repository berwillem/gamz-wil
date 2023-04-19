import React, { useEffect, useRef } from 'react'
import Ads from '../../Components/Ads/Ads'
import CategorySide from '../../Components/CategorySide/CategorySide'
import Details from '../../Components/Details/Details'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import Slider from '../../Components/Slider/Slider'
import TopSelll from '../../Components/TopSelll/TopSelll'
import './Postdetails.css'
import { Power3, gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

function Postdetails(isDarkMode) {
    gsap.registerPlugin(ScrollTrigger);
    
    const cardContainer = useRef();
    const cardContainer2 = useRef();
    const cardContainer3 = useRef();
    useEffect(() => {
     gsap.to(cardContainer2.current,{y:0,delay:0.2,opacity:1,duration:1,ease:Power3.easeOut,scrollTrigger:cardContainer2.current})
      gsap.to(cardContainer3.current,{y:10,delay:0.2,opacity:1,duration:1,ease:Power3.easeOut,scrollTrigger:cardContainer3.current})
      gsap.to(cardContainer.current,{x:0,delay:0.2,opacity:1,duration:1,ease:Power3.easeOut,scrollTrigger:cardContainer.current})
    }, [])
    const p=isDarkMode.isDarkMode
    return (
        <div className='post-details-container'>
            <Navbar p={p} />
            <div className="post-details-center">



                <div className="Ads-category" ref={cardContainer2}>
                <CategorySide/>
                <Ads
            uri='https://electro.madrasthemes.com/wp-content/uploads/2016/03/ad-banner-sidebar.jpg'/>
                </div>
                <div className="post-details">
                    <Details/>
                </div>
            </div>
            <div className="home-bottom">
            <TopSelll/>
                <Ads
                uri='https://electro.madrasthemes.com/wp-content/uploads/2019/04/footer-widget-img-01.jpg'
                />

            </div>
            <Footer  p={p} />





        </div>
    )
}

export default Postdetails

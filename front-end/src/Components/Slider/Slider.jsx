import React, {useEffect, useState, useRef} from 'react'
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {gsap, Power3} from "gsap";
import './Slider.css'
import {AiFillRightCircle} from 'react-icons/ai'

const image1 = 'https://electro.madrasthemes.com/wp-content/uploads/2016/03/headphonecase.png'
const image2 = " https://electro.madrasthemes.com/wp-content/uploads/2016/03/usbheadphone.png"
const image3 = " https://electro.madrasthemes.com/wp-content/uploads/2016/03/cam4k-300x300.png"
const image4 = " https://electro.madrasthemes.com/wp-content/uploads/2016/03/watch-300x300.png"

function Slider() {
   
    gsap.registerPlugin(ScrollTrigger);
    const subtitle = useRef();
    const title = useRef();
    const dot = useRef();
    const button = useRef();
    const cardContainer = useRef();
    const cardContainer2 = useRef();
    const cardContainer3 = useRef();
    useEffect(() => {
        gsap.to(subtitle.current, {
            y: 0,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: subtitle.current
        })
        gsap.to(dot.current, {
            y: 0,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: dot.current
        })
        gsap.to(button.current, {
            y: 0,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: button.current
        })
        gsap.to(title.current, {
            y: 0,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: title.current
        })
        gsap.to(cardContainer.current, {
            x: 0,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: cardContainer.current
        })
        gsap.to(cardContainer2.current, {
            x: 0,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: cardContainer2.current
        })
        gsap.to(cardContainer3.current, {
            y: 0,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: cardContainer3.current
        })
    }, [])

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImageIndex(currentImageIndex => (currentImageIndex + 1) % 4);
        }, 4000); // change slide every 5 seconds
      
        return () => clearInterval(interval);
      }, []);
    return (
        <div className='slider'>
            <div className="L-slider">
                <div ref={title}
                    className="title-slider">
                    <p>SHOP TO GET WHAT YOU LOVE</p>

                </div>
                <div className="sub-title">
                    <p ref={subtitle}>

                        TIMEPIECES THAT
                        <br/>
                        MAKE A STATEMENT
                        <br/>
                        UP  TO
                        <span>
                            40% OFF</span>
                    </p>
                </div>
                <div className="buy-button">
                    <button ref={button}>
                        Start buying
                    </button>
                </div>

                <div ref={dot}
                    className="button-container">

                    <button onClick={
                            () => setCurrentImageIndex(0)
                        }
                        className={
                            currentImageIndex === 0 ? 'active' : ''
                    }></button>
                    <button onClick={
                            () => setCurrentImageIndex(1)
                        }
                        className={
                            currentImageIndex === 1 ? 'active' : ''
                    }></button>
                    <button onClick={
                            () => setCurrentImageIndex(2)
                        }
                        className={
                            currentImageIndex === 2 ? 'active' : ''
                    }></button>
                    <button onClick={
                            () => setCurrentImageIndex(3)
                        }
                        className={
                            currentImageIndex === 3 ? 'active' : ''
                    }></button>
                </div>
            </div>
            <div className="C-slider">

                <img src={
                        currentImageIndex === 0 ? image1 : currentImageIndex === 1 ? image2 : currentImageIndex === 2 ? image3 : currentImageIndex === 3 ? image4 : null
                    }
                    alt="Slideshow Image"
                    ref={cardContainer3}
                    className={`slideshow ${currentImageIndex !== 0 ? 'fade-in' : ''}`}/>
            </div>

            <div className="R-slider">
                <div ref={cardContainer}
                    className="box">
                    <div className="title-box">
                        <p>CATCH BIG
                            <strong>
                                DEAL</strong>
                            ON
                            <br/>
                            THE CONSOLES</p>
                    </div>
                    <div className="sub-title-box">
                        <strong>
                            Shop now
                        </strong>
                        <AiFillRightCircle size={20}
                            color='#e81a2a'/>
                        <div className="image-R-slide">
                            <img src={image1}
                                alt="image-slide"/>
                        </div>
                    </div>
                </div>
                <div className="box"
                    ref={cardContainer2}>
                    <div className="title-box">
                        <p>CATCH BIG
                            <strong>
                                DEAL</strong>
                            ON
                            <br/>
                            THE CONSOLES</p>
                    </div>
                    <div className="sub-title-box">
                        <strong>
                            Shop now
                        </strong>
                        <AiFillRightCircle size={20}
                            color='#e81a2a'/>
                        <div className="image-R-slide">
                            <img src={image2}
                                alt="image-slide"/>
                        </div>
                    </div>

                </div>

            </div>


        </div>
    )
}

export default Slider

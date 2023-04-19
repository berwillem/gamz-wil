import React, {useEffect, useRef} from 'react'
import {AiOutlineHeart} from 'react-icons/ai'
import {Box} from '../../Data/Box'
import UserPost from '../UserPost/UserPost'
import './Details.css'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger'
import {Power3} from 'gsap'
import image_user from '../../assets/user_image.jpg'

const boxSlice = Box.slice(0, 3)

function Details({
big_image,
image1,
image2,
image3,
title,
category,
description}) {


gsap.registerPlugin(ScrollTrigger);

const cardContainer = useRef();
const cardContainer2 = useRef();
const cardContainer3 = useRef();
useEffect(() => {
    gsap.to(cardContainer.current, {
        y: 0,
        delay: 0.2,
        opacity: 1,
        zIndex: 0,
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
return (
    <div className='details-container'>
            <div className="user-avatar">
                <img src={image_user} alt="" />
                <strong>user name </strong>
            </div>
        <div className="post-details">


            <div className="post-details-l"
                ref={cardContainer}>
                <div className="big-image">
                    <img src='https://electro.madrasthemes.com/wp-content/uploads/2016/03/uniheadphone.png' alt=""/>
                </div>
                <div className="sub-images">
                    <img src='https://electro.madrasthemes.com/wp-content/uploads/2016/03/uniheadphone.png' alt="" className='images'/>
                    <img src='https://electro.madrasthemes.com/wp-content/uploads/2016/03/uniheadphone.png' alt="" className='images'/>
                    <img src='https://electro.madrasthemes.com/wp-content/uploads/2016/03/uniheadphone.png' alt="" className='images'/>
                </div>
            </div>

            <div className="post-details-r"
                ref={cardContainer2}>
                <div className="post-details-category">
                    <p>headPhones</p>
                </div>
                <div className="post-details-title">
                    <p>White Solo 2 Wireless</p>
                </div>
                <div className="post-details-description">
                    <p>iPhone headphones, also known as EarPods, are the standard earphones that come bundled with Apple's iPhone devices. These headphones feature a compact, in-ear design that provides a comfortable fit for most users. The EarPods are engineered with a precise acoustic chamber to deliver high-quality audio, with crisp highs and deep bass. The headphones also feature a built-in remote and microphone, allowing users to control music playback, adjust volume, and answer or end phone calls with ease.</p>
                </div>
                <div className="post-details-price">
                    <p>
                        $ 248.99</p>
                    <button className='button-whislist'>
                        <p>
                            WishList</p>
                        <AiOutlineHeart size={20}/>
                    </button>
                </div>
            <div className="info">
                
                    <li><strong>0552184454</strong></li>
                    <li><strong> place where he live</strong></li>
                
            </div>
            </div>
        </div>


        {/* related post section  */}


        <div className="related-post"
            ref={cardContainer3}>
            <div className="related-title">
                <p>Related Post</p>
            </div>
            <div className="user-post ">

                {
                boxSlice.map((i, key) => (
                    <UserPost key={
                            i.id
                        }
                        user_post_image={
                            i.image
                        }
                        name={
                            i.name
                        }
                        price={
                            i.price
                        }
                        category={
                            i.category
                        }/>
                ))
            } </div>
        </div>
    </div>
)}export default Details

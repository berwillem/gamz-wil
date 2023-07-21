import React, { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap, Power3 } from "gsap";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./PubManageMobile.css";
import axios from "axios";
import iphone from "../../assets/images/iphone.webp";
import slide1 from "../../assets/images/SMALL1.webp";
import slide2 from "../../assets/images/SMALL2.webp";
import slide from "../../assets/images/telslide.webp";


const baseURL = import.meta.env.VITE_BASE_URL;
function PubManageMobile({ disp }) {
  // State variables
  const [backgroundImage, setBackgroundImage] = useState(slide);
  const [backgroundImage2, setBackgroundImage2] = useState(slide1);
  const [backgroundImage3, setBackgroundImage3] = useState(slide2);
  const [urlArray, setUrlArray] = useState(["", "", ""]);

  const [loading, setLoading] = useState(false);
  // Refs
 console.log(urlArray[0],urlArray[1],urlArray[2]);

  const title = useRef();
  const dot = useRef();
  const button = useRef();
  const cardContainer = useRef();
  const cardContainer2 = useRef();

  // Change the background image of the slider
  const handleBackgroundChange = (event) => {
   
    const file = event.target.files[0];
    setBackgroundImage(URL.createObjectURL(file));
  };

  // Change the background image of the first card
  const handleBackgroundChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBackgroundImage2(URL.createObjectURL(file));
      setPub1(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setBackgroundImage2(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Change the background image of the second card
  const handleBackgroundChange3 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBackgroundImage3(URL.createObjectURL(file));
      setPub2(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setBackgroundImage3(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Animation effects using gsap and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
   
    gsap.to(dot.current, {
      y: 0,
      delay: 0.2,
      opacity: 1,
      duration: 1,
      ease: Power3.easeOut,
      scrollTrigger: {
        trigger: dot.current,
      },
    });
    gsap.to(button.current, {
      y: 0,
      delay: 0.2,
      opacity: 1,
      duration: 1,
      ease: Power3.easeOut,
      scrollTrigger: {
        trigger: button.current,
      },
    });
    gsap.to(title.current, {
      y: 0,
      delay: 0.2,
      opacity: 1,
      duration: 1,
      ease: Power3.easeOut,
      scrollTrigger: {
        trigger: title.current,
      },
    });
    gsap.to(cardContainer.current, {
      x: 0,
      delay: 0.2,
      opacity: 1,
      duration: 1,
      ease: Power3.easeOut,
      scrollTrigger: {
        trigger: cardContainer.current,
      },
    });
    gsap.to(cardContainer2.current, {
      x: 0,
      delay: 0.2,
      opacity: 1,
      duration: 1,
      ease: Power3.easeOut,
      scrollTrigger: {
        trigger: cardContainer2.current,
      },
    });
  }, []);


  // Handle the URL change
  const handleURLChange = (event, index) => {
    const { value } = event.target;
    const updatedUrls = [...urlArray];
    updatedUrls[index] = value;
    setUrlArray(updatedUrls);
  };





  return (
    <>
    <Navbar/>
      {loading && (
        <div className="loader">
         <span className="loader"></span>
        </div>
      )}
      <form
        action=""
        className="manage"
      
      >
        <img src={iphone} className="iphone" alt="" />
        <div className="dot">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleBackgroundChange(event)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundChange2}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundChange3}
          />
      
          <input
            type="url"
            placeholder="url 1"
            value={urlArray[0]}
            onChange={(event) => handleURLChange(event, 0)}
          />
          <input
            type="url"
            placeholder="url 2"
            value={urlArray[1]}
            onChange={(event) => handleURLChange(event, 1)}
          />
          <input
            type="url"
            placeholder="url 3"
            value={urlArray[2]}
            onChange={(event) => handleURLChange(event, 2)}
          />
        </div>

        <div className="mobile">
          <div
            className="slider"
            style={{
                backgroundImage: `url(${backgroundImage})`,
              }}
          >
            <div className="R-C-slider">
              <div className="L-slider">
               
                <div className="buy-button">
                  <Link target="_blank">
                    <button ref={button}>En savoir plus !</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="R-slider">
              <Link target="_blank">
                <div
                  ref={cardContainer}
                  className="box"
                  style={{
                    backgroundImage: `url(${backgroundImage2})`,
                  }}
                >
                 
                </div>
              </Link>
              <Link target="_blank">
                <div
                  className="box"
                  ref={cardContainer2}
                  style={{
                    backgroundImage: `url(${backgroundImage3})`,
                  }}
                >
                  <div className="title-box">
                   
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <input type="submit" className="btnsub" />
      </form>
    </>
  );
}

export default PubManageMobile;
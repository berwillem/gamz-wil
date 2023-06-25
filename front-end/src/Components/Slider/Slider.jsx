import React, { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap, Power3 } from "gsap";
import "./Slider.css";
import { AiFillRightCircle } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import slide1 from "../../assets/images/SMALL1.webp"
import slide2 from "../../assets/images/SMALL2.webp"
import slide from "../../assets/images/telslid.webp"

// default image
const image1 =
  "https://electro.madrasthemes.com/wp-content/uploads/2016/03/headphonecase.png";
const image2 =
  " https://electro.madrasthemes.com/wp-content/uploads/2016/03/usbheadphone.png";
const image3 =
  " https://electro.madrasthemes.com/wp-content/uploads/2016/03/cam4k-300x300.png";
const image4 =
  " https://electro.madrasthemes.com/wp-content/uploads/2016/03/watch-300x300.png";

const baseURL = import.meta.env.VITE_BASE_URL;
function Slider() {
  //state
  const [images, setImages] = useState([
    {
      id: 0,
      src: image1,
    },
    {
      id: 1,
      src: image2,
    },
    {
      id: 2,
      src: image3,
    },
    {
      id: 3,
      src: image4,
    },
  ]);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [redirect, setRedirect] = useState([]);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  const [card, setCard] = useState({});
  const [card1, setCard1] = useState({});
  const [card2, setCard2] = useState({});


  //variable
  const imageUrl = backgroundImages[currentImageIndex2];
  const RedirectLink = redirect[currentImageIndex2];
  gsap.registerPlugin(ScrollTrigger);
  const subtitle = useRef();
  const title = useRef();
  const dot = useRef();
  const button = useRef();
  const cardContainer = useRef();
  const cardContainer2 = useRef();
  const isMobile = window.matchMedia("(max-width: 450px)").matches;
  //respo
  const backgroundImage = isMobile
  ? `url(${slide1})` // Utilisation de l'image statique pour la version téléphone
  : card1 && card1.cardOneImage && card1.cardOneImage.url
      ? `url(${card1.cardOneImage.url})` // Utilisation de l'URL de l'image depuis l'API pour la version desktop
      : '';
  const backgroundImage2 = isMobile
  ? `url(${slide2})` // Utilisation de l'image statique pour la version téléphone
  : card2 && card2.cardTwoImage && card2.cardTwoImage.url
      ? `url(${card2.cardTwoImage.url})` // Utilisation de l'URL de l'image depuis l'API pour la version desktop
      : '';
  const backgroundImage3 = isMobile
  ? `url(${slide})` // Utilisation de l'image statique pour la version téléphone
  : card && card.pub && imageUrl
      ? `url(${imageUrl})` // Utilisation de l'URL de l'image depuis l'API pour la version desktop
      : '';
     
  // api call
  useEffect(() => {
    axios
      .get(baseURL + "/pub/")
      .then((response) => {
        const { cardOne, cardTwo, pub } = response.data;
        setCard(response.data);
        setCard1(cardOne);
        setCard2(cardTwo);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // function card
  useEffect(() => {
    if (card.pub && card.pub.length > 0) {
      const pubUrls = card.pub.map((item) => item.url);
      setBackgroundImages(pubUrls);
    }
    if (card.redirectUrls && card.redirectUrls.length > 0) {
      const redirectUrls = card.redirectUrls.map((item) => item.url);
      setRedirect(redirectUrls);
    }
  }, [card]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex2((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //style
  useEffect(() => {
    gsap.to(subtitle.current, {
      y: 0,
      delay: 0.2,
      opacity: 1,
      duration: 1,
      ease: Power3.easeOut,
      scrollTrigger: subtitle.current,
    });
    gsap.to(dot.current, {
      y: 0,
      delay: 0.2,
      opacity: 1,
      duration: 1,
      ease: Power3.easeOut,
      scrollTrigger: dot.current,
    });
    gsap.to(button.current, {
      y: 0,
      delay: 0.2,
      opacity: 1,
      duration: 1,
      ease: Power3.easeOut,
      scrollTrigger: button.current,
    });
    gsap.to(title.current, {
      y: 0,
      delay: 0.2,
      opacity: 1,
      duration: 1,
      ease: Power3.easeOut,
      scrollTrigger: title.current,
    });
    gsap.to(cardContainer.current, {
      x: 0,
      delay: 0.2,
      opacity: 1,
      duration: 1,
      ease: Power3.easeOut,
      scrollTrigger: cardContainer.current,
    });
    gsap.to(cardContainer2.current, {
      x: 0,
      delay: 0.2,
      opacity: 1,
      duration: 1,
      ease: Power3.easeOut,
      scrollTrigger: cardContainer2.current,
    });
  }, []);

  return (
    <div
      className="slider"
      style={{
        backgroundImage: backgroundImage3,
      }}
    >
      <div className="R-C-slider">
        <div className="L-slider">
          <div className="sub-title">
            {card && card.title ? (
              <p ref={subtitle}>{card.title}</p>
            ) : (
              <p ref={subtitle}>
                TIMEPIECES THAT
                <br />
                MAKE A STATEMENT
                <br />
                UP TO
                <span>40% OFF</span>
              </p>
            )}
          </div>
          <div className="buy-button">
            <Link
              to={card && card.redirectUrls && RedirectLink ? RedirectLink : ""}
              target="_blank"
            >
              <button ref={button}>En savoir plus !</button>
            </Link>
          </div>
        </div>
        <div className="C-slider"></div>
      </div>
      <div className="R-slider">
        <Link to={card1.redirect} target="_blank">
          <div
            ref={cardContainer}
            className="box"
            style={{
              backgroundImage,
            }}
          >
            <div className="title-box">
              {card1 && card1.title ? (
                <p>{card1.title}</p>
              ) : (
                <p>
                  CATCH BIG
                  <strong>DEAL</strong>
                  ON
                  <br />
                  THE CONSOLES
                </p>
              )}
            </div>
            <div className="sub-title-box">
              <strong>En savoir plus !</strong>

              <AiFillRightCircle size={20} color="#e81a2a" />
              <div className="image-R-slide">
                <img
                  src={images[0].src}
                  alt="image-slide"
                />
              </div>
            </div>
          </div>
        </Link>
        <Link to={card2.redirect} target="_blank">
          <div
            className="box"
            ref={cardContainer2}
            style={{
              backgroundImage: backgroundImage2,
            }}
          >
            <div className="title-box">
              {card2 && card2.title ? (
                <p>{card2.title}</p>
              ) : (
                <p>
                  CATCH BIG
                  <strong>DEAL</strong>
                  ON
                  <br />
                  THE CONSOLES
                </p>
              )}
            </div>
            <div className="sub-title-box">

              <strong>En savoir plus !</strong>

              <AiFillRightCircle size={20} color="#e81a2a" />
              <div className="image-R-slide">
                <img
                  src={images[1].src}
                  alt="image-slide"
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Slider;

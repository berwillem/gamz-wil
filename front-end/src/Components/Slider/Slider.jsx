import React, { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap, Power3 } from "gsap";
import "./Slider.css";
import { AiFillRightCircle } from "react-icons/ai";

import axios from "axios";
import { Link } from "react-router-dom";

const image1 =
  "https://electro.madrasthemes.com/wp-content/uploads/2016/03/headphonecase.png";
const image2 =
  " https://electro.madrasthemes.com/wp-content/uploads/2016/03/usbheadphone.png";
const image3 =
  " https://electro.madrasthemes.com/wp-content/uploads/2016/03/cam4k-300x300.png";
const image4 =
  " https://electro.madrasthemes.com/wp-content/uploads/2016/03/watch-300x300.png";

const baseURL = import.meta.env.VITE_BASE_URL;
function Slider({ disp }) {
  const [display, setDisplay] = useState(disp);
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

  const [card, setCard] = useState({});
  const [card1, setCard1] = useState({});
  const [card2, setCard2] = useState({});

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
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [redirect, setRedirect] = useState([]);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  const imageUrl = backgroundImages[currentImageIndex2];
  const RedirectLink = redirect[currentImageIndex2];
  // Index de l'image actuellement affiché
  useEffect(() => {
    // Fonction pour changer l'image toutes les 3 secondes
    const interval = setInterval(() => {
      setCurrentImageIndex2((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    // Nettoyage de l'intervalle lors de la désactivation du composant
    return () => {
      clearInterval(interval);
    };
  }, []);

  gsap.registerPlugin(ScrollTrigger);
  const subtitle = useRef();
  const title = useRef();
  const dot = useRef();
  const button = useRef();
  const cardContainer = useRef();
  const cardContainer2 = useRef();

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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((currentImageIndex) => (currentImageIndex + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const [file, setFile] = useState(null);
  const [file2, setFil2] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange2 = (event) => {
    const file2 = event.target.files[0];
    if (file2) {
      setFil2(file2);
      const reader = new FileReader();
      reader.onload = () => {
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="slider"
      style={{
        backgroundImage: `url(${card && card.pub && imageUrl ? imageUrl : ""})`,
      }}
    >
      <div className="R-C-slider">
        <div className="L-slider">
          <div ref={title} className="title-slider">
            <p>SHOP TO GET WHAT YOU LOVE</p>
          </div>
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
            >
              <button ref={button}>Start buying</button>
            </Link>
          </div>
        </div>
        <div className="C-slider"></div>
      </div>
      <div className="R-slider">
        <div
          ref={cardContainer}
          className="box"
          style={{
            backgroundImage: `url(${
              card1 && card1.cardOneImage && card1.cardOneImage.url
                ? card1.cardOneImage.url
                : ""
            })`,
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
            {display ? <input type="file" onChange={handleFileChange} /> : null}
            <Link to={card1.redirect}>
              <strong>Shop now</strong>
            </Link>
            <AiFillRightCircle size={20} color="#e81a2a" />
            <div className="image-R-slide">
              <img
                src={file ? URL.createObjectURL(file) : images[0].src}
                alt="image-slide"
              />
            </div>
          </div>
        </div>
        <div
          className="box"
          ref={cardContainer2}
          style={{
            backgroundImage: `url(${
              card2 && card2.cardTwoImage && card2.cardTwoImage.url
                ? card2.cardTwoImage.url
                : ""
            })`,
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
            {display ? (
              <input type="file" onChange={handleFileChange2} />
            ) : null}
            <Link to={card2.redirect}>
              <strong>Shop now</strong>
            </Link>
            <AiFillRightCircle size={20} color="#e81a2a" />
            <div className="image-R-slide">
              <img
                src={file2 ? URL.createObjectURL(file2) : images[1].src}
                alt="image-slide"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;

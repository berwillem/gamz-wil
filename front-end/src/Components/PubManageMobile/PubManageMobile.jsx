import { useEffect, useState, useRef } from "react";
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
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { createPubMobil } from "../../services/Pubs";

const baseURL = import.meta.env.VITE_BASE_URL;
function PubManageMobile({}) {
  // State variables
  const [backgroundImage, setBackgroundImage] = useState([
    { src: slide },
    { src: slide },
    { src: slide },
  ]);
  const [backgroundImage2, setBackgroundImage2] = useState(slide1);
  const [backgroundImage3, setBackgroundImage3] = useState(slide2);
  const [urlArray, setUrlArray] = useState(["", "", ""]);
  const [principalImagesFile, setPrincipalImagesFile] = useState([]);
  const [pub1, setPub1] = useState(null);
  const [pub2, setPub2] = useState(null);
  const [subtitleValue1, setSubtitleValue1] = useState("");
  const [subtitleValue2, setSubtitleValue2] = useState("");
  const [subtitleValue3, setSubtitleValue3] = useState("");
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [url4, setUrl4] = useState("");
  const [url5, setUrl5] = useState("");
  // Refs
  const subtitle = useRef();
  const subtitle2 = useRef();
  const subtitle3 = useRef();
  const title = useRef();
  const dot = useRef();
  const button = useRef();
  const cardContainer = useRef();
  const cardContainer2 = useRef();

  // Change the background image of the slider
  const handleBackgroundChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        const newImage = { src: imageUrl };
        const updatedImages = [...backgroundImage];
        updatedImages[index] = newImage;
        setBackgroundImage(updatedImages);

        const newImageFiles = [...principalImagesFile];
        newImageFiles[index] = file;
        setPrincipalImagesFile(newImageFiles);
      };
      reader.readAsDataURL(file);
    }
  };
  // Switch to the next background image
  const switchback = () => {
    setIndex((index) =>
      index < backgroundImage.length - 1
        ? index + 1
        : backgroundImage.length - 1
    );
  };

  // Switch to the previous background image
  const switchback2 = () => {
    setIndex((index) => (index > 0 ? index - 1 : 0));
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

  // Handle the subtitle change for a specific ref
  const handleSubtitleChange = (ref, setSubtitleValue) => {
    const newSubtitle = prompt("Enter a new subtitle:");
    if (newSubtitle) {
      setSubtitleValue(newSubtitle);
    }
  };
  // Handle the URL change
  const handleURLChange = (event, index) => {
    const { value } = event.target;
    const updatedUrls = [...urlArray];
    updatedUrls[index] = value;
    setUrlArray(updatedUrls);
  };
  // Handle the URL4 change
  const handleURL4Change = (event) => {
    const { value } = event.target;
    setUrl4(value);
  };

  // Handle the URL5 change
  const handleURL5Change = (event) => {
    const { value } = event.target;
    setUrl5(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    window.scrollTo({ top: 300 });
    const requestData = {
      pub: principalImagesFile,
      title: subtitleValue1,
      redirectUrls: urlArray.map((url) => ({ url })),
      cardOne: {
        title: subtitleValue2,
        cardOneImage: pub1,
        redirect: url4,
      },
      cardTwo: {
        title: subtitleValue3,
        cardTwoImage: pub2,
        redirect: url5,
      },
    };

    const formData = new FormData();
    formData.append("pub", requestData.pub[0]);
    formData.append("pub", requestData.pub[1]);
    formData.append("pub", requestData.pub[2]);
    formData.append("title", requestData.title);
    formData.append("redirectUrls", JSON.stringify(requestData.redirectUrls));
    formData.append("cardOne[title]", requestData.cardOne.title);
    formData.append("cardOneImage", requestData.cardOne.cardOneImage);
    formData.append("cardOne[redirect]", requestData.cardOne.redirect);
    formData.append("cardTwo[title]", requestData.cardTwo.title);
    formData.append("cardTwoImage", requestData.cardTwo.cardTwoImage);
    formData.append("cardTwo[redirect]", requestData.cardTwo.redirect);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const sessionId = user.sessionId;
      
      //TODO: test it
      const res = await createPubMobil(formData, sessionId);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your request has been submitted successfully!",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error occurred while submitting the request",
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  console.log(subtitleValue1);
  return (
    <>
      <Navbar />
      {loading && (
        <div className="loader">
          <span className="loader"></span>
        </div>
      )}
      <form action="" className="manage" onSubmit={handleSubmit}>
        <img src={iphone} className="iphone" alt="" />
        <div className="switch2">
          <AiOutlineLeft onClick={switchback2} size={20} color="#fff" />
          <AiOutlineRight onClick={switchback} size={20} color="#fff" />
        </div>
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
            type="button"
            value="enter text 1"
            onClick={() => handleSubtitleChange(subtitle, setSubtitleValue1)}
          />
          <input
            type="button"
            value="enter text 2"
            onClick={() => handleSubtitleChange(subtitle2, setSubtitleValue2)}
          />
          <input
            type="button"
            value="enter text 3"
            onClick={() => handleSubtitleChange(subtitle3, setSubtitleValue3)}
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
          <input
            type="url"
            placeholder="url 4"
            value={url4}
            onChange={handleURL4Change}
          />
          <input
            type="url"
            placeholder="url 5"
            value={url5}
            onChange={handleURL5Change}
          />
        </div>

        <div className="mobile">
          <div
            className="slider"
            style={{
              backgroundImage: `url(${backgroundImage[index].src})`,
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
                ></div>
              </Link>
              <Link target="_blank">
                <div
                  className="box"
                  ref={cardContainer2}
                  style={{
                    backgroundImage: `url(${backgroundImage3})`,
                  }}
                >
                  <div className="title-box"></div>
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

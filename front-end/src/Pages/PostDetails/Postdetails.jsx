import { useEffect, useRef, useState } from "react";
import Ads from "../../Components/Ads/Ads";
import CategorySide from "../../Components/CategorySide/CategorySide";
import Details from "../../Components/Details/Details";

import axios from "axios";
import pubImg from "../../assets/images/pub.webp";
import TopSelll from "../../Components/TopSelll/TopSelll";
import "./Postdetails.css";
import { Power3, gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLocation } from "react-router-dom";
const baseURL = import.meta.env.VITE_BASE_URL;

function Postdetails() {
  gsap.registerPlugin(ScrollTrigger);
  const cardContainer = useRef();
  const cardContainer2 = useRef();
  const cardContainer3 = useRef();
  useEffect(() => {
    gsap.to(cardContainer2.current, {
      y: 0,
      delay: 0.2,
      opacity: 1,
      duration: 1,
      ease: Power3.easeOut,
      scrollTrigger: cardContainer2.current,
    });
    gsap.to(cardContainer3.current, {
      y: 10,
      delay: 0.2,
      opacity: 1,
      duration: 1,
      ease: Power3.easeOut,
      scrollTrigger: cardContainer3.current,
    });
    gsap.to(cardContainer.current, {
      x: 0,
      delay: 0.2,
      opacity: 1,
      duration: 1,
      ease: Power3.easeOut,
      scrollTrigger: cardContainer.current,
    });
  }, []);

  // api call:
  const [post, setPost] = useState(null);
  const location = useLocation();
  const postId = location.pathname.split("/").pop();
  useEffect(() => {
    axios
      .get(baseURL + `/post/${postId}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, [postId]);

  return (
    <div className="post-details-container">
      <div className="post-details-center">
        <div className="Ads-category" ref={cardContainer2}>
          <CategorySide />
          <Ads ad = {1} />
        </div>
        <div className="post-details">
          <Details postinfo={post} />
        </div>
      </div>
      <div className="home-bottom">
        <TopSelll />
        <Ads ad = {2} />
      </div>
    </div>
  );
}

export default Postdetails;

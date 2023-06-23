import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap, Power3 } from "gsap";
import "./TopSelll.css";
import { Box } from "../../Data/Box";
import TopSelBox from "../TopSelBox/TopSelBox";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const boxSlice = Box.slice(0, 3);

function TopSelll() {
  const [postsConsole, setPostsConsole] = useState([]);
  const [postsTelephone, setPostsTelephone] = useState([]);
  const [postsInformatique, setPostsInformatique] = useState([]);

  useEffect(() => {
    // Fetch posts for category "console"
    axios
      .get(baseURL + "/post/category/644b93f21b7633709d2db121")
      .then((response) => {
        setPostsConsole(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Fetch posts for category "informatique"
    axios
      .get(baseURL + "/post/category/644b907d1b7633709d2db0fa")
      .then((response) => {
        setPostsInformatique(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Fetch posts for category "telephone"
    axios
      .get(baseURL + "/post/category/644b97091b7633709d2db1d8")
      .then((response) => {
        setPostsTelephone(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const boxSlice1 = shuffleArray(postsConsole).slice(0, 3);
  const boxSlice2 = shuffleArray(postsInformatique).slice(0, 3);
  const boxSlice3 = shuffleArray(postsTelephone).slice(0, 3);

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  gsap.registerPlugin(ScrollTrigger);
  const cardContainer = useRef();

  useEffect(() => {
    gsap.to(cardContainer.current, {
      x: 0,
      delay: 0.2,
      opacity: 1,
      duration: 1,
      ease: Power3.easeOut,
      scrollTrigger: cardContainer.current,
    });
  }, []);

  return (
    <>
      {boxSlice1.length === 0 ||
      boxSlice2.length === 0 ||
      boxSlice3.length === 0 ? (
        <div className="noPost">
          <h2>NO POSTS YET</h2>
        </div>
      ) : (
        <div className="topSell-container">
          <div className="top-Sell-title">
            <h4>Other listings</h4>
          </div>
          <div className="topSell-content" ref={cardContainer}>
            <div className="grid">
              {boxSlice1.map((item, key) => (
                <TopSelBox key={key} i={item} />
              ))}
            </div>
            <div className="grid">
              {boxSlice2.map((item, key) => (
                <TopSelBox key={key} i={item} />
              ))}
            </div>
            <div className="grid">
              {boxSlice3.map((item, key) => (
                <TopSelBox key={key} i={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TopSelll;

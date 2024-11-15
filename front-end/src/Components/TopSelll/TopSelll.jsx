import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap, Power3 } from "gsap";
import "./TopSelll.css";
import TopSelBox from "../TopSelBox/TopSelBox";
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

function TopSelll() {
  //state
  const [postsConsole, setPostsConsole] = useState([]);
  const [postsTelephone, setPostsTelephone] = useState([]);
  const [postsInformatique, setPostsInformatique] = useState([]);
  
  // variable
  const boxSlice1 = postsConsole.slice(0, 3);
  const boxSlice2 = postsInformatique.slice(0, 3);
  const boxSlice3 = postsTelephone.slice(0, 3);
  // api call
  useEffect(() => {
    axios
      .get(baseURL + `/post/category/6473d62704ebb30a210eb4fa`)
      .then((response) => {
        // Traiter les données de la réponse
        setPostsConsole(response.data.posts);
      })
      .catch((error) => {
        // Gérer les erreurs
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(baseURL + `/post/category/6473e00104ebb30a210eb656`)
      .then((response) => {
        // Traiter les données de la réponse
        setPostsInformatique(response.data.posts);
      })
      .catch((error) => {
        // Gérer les erreurs
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(baseURL + `/post/category/6473d58404ebb30a210eb48e`)
      .then((response) => {
        // Traiter les données de la réponse
        setPostsTelephone(response.data.posts);
      })
      .catch((error) => {
        // Gérer les erreurs
        console.error(error);
      });
  }, []);


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
      {boxSlice1.length == 0 ||
      boxSlice2.length == 0 ||
      boxSlice3.length == 0 ? (
        <div className="noPost">
          <h2> PAS DE POST ENCORE </h2>
        </div>
      ) : (
        <div className="topSell-container">
          <div className="top-Sell-title">
            <h4>Autres annonces</h4>
          </div>
          <div className="topSell-content" ref={cardContainer}>
            <div className="grid">
              {boxSlice1.map((i, index) => (
                <TopSelBox key={index} i={i} />
              ))}
            </div>
            <div className="grid">
              {boxSlice2.map((i, index) => (
                <TopSelBox key={index} i={i} />
              ))}
            </div>
            <div className="grid">
              {boxSlice3.map((i, index) => (
                <TopSelBox key={index} i={i} />
              ))}
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}

export default TopSelll;

import React, { useEffect, useRef, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Box } from "../../Data/Box";
import "./Details.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Power3 } from "gsap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import RelatedPost from "../RelatedPost/RelatedPost";

function Details() {
  // api call :::
  const [post, setPost] = useState("");
  const [pricipalImage, setPricipalImage] = useState("");
  const [secondImage, setSecondImage] = useState("");
  const [thirdImage, setThirdImage] = useState("");
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
 
  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/post/${postId}`
      );
      setPost(response.data);
      if (response.data.category) {
        setId(response.data.category._id);
      }
      setPricipalImage(response.data.images[0].url)
      setSecondImage(response.data.images[1].url)
      setThirdImage(response.data.images[2].url)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPostDetails();
   
  }, [postId]);
 
  //   style ::
  const boxSlice = Box.slice(0, 3);
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
    gsap.to(cardContainer3.current, {
      y: 0,
      delay: 0.2,
      opacity: 1,
      duration: 1,
      ease: Power3.easeOut,
      scrollTrigger: cardContainer3.current,
    });
  }, []);
  const [posts, setPosts] = useState([]);
 

    const [id, setId] = useState("");
   
  useEffect(() => {
   
    axios.get(`http://localhost:5000/api/v1/post/category/${id}` )
      .then(response => {
        // Traiter les données de la réponse
        setPosts(response.data)
        
     
      })
      .catch(error => {
        // Gérer les erreurs
        console.error(error);
      });
  }, [id]);
  const slicedData = shuffleArray(posts).slice(0, 3);

// Fonction pour mélanger les éléments d'un tableau
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
 
  return (
    <div className="details-container">
       {post && post.author && (
      <div className="user-avatar">
        <img src={post.author.avatar.url} alt="" />
        <strong>{post.author.username} </strong>
      </div>
    )}
      <div className="post-details">
        <div className="post-details-l" ref={cardContainer}>
          <div className="big-image">
            <img
              src="https://electro.madrasthemes.com/wp-content/uploads/2016/03/uniheadphone.png"
              alt=""
            />
          </div>
          <div className="sub-images">
            <img
              src="https://electro.madrasthemes.com/wp-content/uploads/2016/03/uniheadphone.png"
              alt=""
              className="images"
            />
            <img
              src="https://electro.madrasthemes.com/wp-content/uploads/2016/03/uniheadphone.png"
              alt=""
              className="images"
            />
          </div>
        </div>

        <div className="post-details-r" ref={cardContainer2}>
        {post && post.category && (
          <div className="post-details-category">
            <p>{post.category.name}</p>
          </div>
           )}
        
          <div className="post-details-title">
            <p>{post.title}</p>
          </div>
          <div className="post-details-description">
            <p> {post.description}</p>
          </div>
          <div className="post-details-price">
            <p>{post.price} DA</p>
            <button className="button-whislist">
              <p></p>
              <AiOutlineHeart size={20} />
            </button>
          </div>
          <div className="info">
            <li>
              <strong>{post.num}</strong>
            </li>
            <li>
              <strong> place where he live</strong>
            </li>
          </div>
        </div>
      </div>

      {/* related post section  */}
     {slicedData?( <div className="related-post" ref={cardContainer3}>
        <div className="related-title">
          <p>Related Post</p>
        </div>
        <div className="user-post ">
        {slicedData.map(post => (
           <RelatedPost post={post} />))}
    
        </div>
      </div>):""}
    </div>
  );
}
export default Details;

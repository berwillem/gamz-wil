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
import notavalible from "../../assets/images/Image_not_available.png";
import defaultAvatar from "../../assets/images/avatar.png"
const baseURL = import.meta.env.VITE_BASE_URL;


function Details() {
  // api call :::
  const [post, setPost] = useState("");
  const [pricipalImage, setPricipalImage] = useState(notavalible);
  const [secondImage, setSecondImage] = useState(notavalible);
  const [thirdImage, setThirdImage] = useState(notavalible);
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(
        baseURL+`/post/${postId}`
      );
      setPost(response.data);
      if (response.data.category) {
        setId(response.data.category._id);
      }
      if (response.data.images && response.data.images.length > 0) {
        setPricipalImage(response.data.images[0].url);
      }

      if (response.data.images && response.data.images.length > 1) {
        setSecondImage(response.data.images[1].url);
      }

      if (response.data.images && response.data.images.length > 2) {
        setThirdImage(response.data.images[2].url);
      }
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
    axios
      .get(baseURL+`/post/category/${id}`)
      .then((response) => {
        // Traiter les données de la réponse
        setPosts(response.data);
      })
      .catch((error) => {
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
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }
  const handleSubImageClick = (clickedImageURL) => {
    const currentPrincipalImage = pricipalImage;
    setPricipalImage(clickedImageURL);
    if (clickedImageURL === secondImage) {
      setSecondImage(currentPrincipalImage);
    } else if (clickedImageURL === thirdImage) {
      setThirdImage(currentPrincipalImage);
    }
  };

  return (
    <div className="details-container">
      {post && post.author && (
        <div className="user-avatar">
          <img src={post.author.avatar.url ? post.author.avatar.url:defaultAvatar} alt="" />
          <strong>{post.author.username} </strong>
        </div>
      )}
      <div className="post-details">
        <div className="post-details-l" ref={cardContainer}>
          <div className="big-image">
            <img src={pricipalImage} alt="post-image" />
          </div>
          <div className="sub-images">
            <img
              src={secondImage}
              alt="post-image"
              className="images"
              onClick={() => handleSubImageClick(secondImage)} // Switch positions with the clicked sub-image
            />
            <img
              src={thirdImage}
              alt="post-image"
              className="images"
              onClick={() => handleSubImageClick(thirdImage)} // Switch positions with the clicked sub-image
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
              <strong> {post.wilaya}</strong>
            </li>
          </div>
        </div>
      </div>

      {/* related post section  */}
      {slicedData ? (
        <div className="related-post" ref={cardContainer3}>
          <div className="related-title">
            <p>Related Post</p>
          </div>
          <div className="user-post ">
            {slicedData.map((post) => (
              <RelatedPost post={post} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default Details;

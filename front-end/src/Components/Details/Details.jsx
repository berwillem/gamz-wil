import { useEffect, useRef, useState, useMemo } from "react";
import "./Details.css";
import { animateScroll as scroll } from "react-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Power3 } from "gsap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import RelatedPost from "../RelatedPost/RelatedPost";
import notavalible from "../../assets/images/Image_not_available.webp";
import defaultAvatar from "../../assets/images/avatar.webp";
const baseURL = import.meta.env.VITE_BASE_URL;
import LightGallery from "lightgallery/react";
import moment from "moment";
import "moment/locale/fr";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { getPost } from "../../services/Posts";

function Details() {
  const [post, setPost] = useState("");
  const [id, setId] = useState("");
  const [pricipalImage, setPricipalImage] = useState(notavalible);
  const [secondImage, setSecondImage] = useState(notavalible);
  const [thirdImage, setThirdImage] = useState(notavalible);
  const location = useLocation();
  const imageslide = [pricipalImage, secondImage, thirdImage];
  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(1);
  const [index3, setIndex3] = useState(2);
  const postId = location.pathname.split("/")[2];
  const [posts, setPosts] = useState([]);

  const filteredPosts = useMemo(
    () => posts.filter((p) => p._id !== postId),
    [posts, postId]
  );
  const slicedData = useMemo(
    () => shuffleArray(filteredPosts).slice(0, 3),
    [filteredPosts]
  );

  useEffect(() => {
    switch (index) {
      case 0:
        setIndex2(1);
        setIndex3(2);
        break;
      case 1:
        setIndex2(2);
        setIndex3(0);
        break;
      case 2:
        setIndex2(0);
        setIndex3(1);
        break;
      default:
        break;
    }
  }, [index]);

  function handelright() {
    if (index === 2) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  function handelleft() {
    if (index === 0) {
      setIndex(2);
    } else {
      setIndex(index - 1);
    }
  }

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 480px)").matches;
    if (isMobile) {
      scroll.scrollToTop();
    }
  }, []);

  const fetchPostDetails = async () => {
    try {
      setPricipalImage(notavalible);
      setSecondImage(notavalible);
      setThirdImage(notavalible);

      //TODO: test it

      const response = await getPost(postId);

      setPost(response.data);
      if (response.data.category) {
        setId(response.data.category._id);
      }
      if (response.data.images && response.data.images.length > 0) {
        setPricipalImage(
          response.data.images[0].url.replace("http://", "https://")
        );
      }
      if (response.data.images && response.data.images.length > 1) {
        setSecondImage(
          response.data.images[1].url.replace("http://", "https://")
        );
      }
      if (response.data.images && response.data.images.length > 2) {
        setThirdImage(
          response.data.images[2].url.replace("http://", "https://")
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [postId]);

  useEffect(() => {
    axios
      .get(`${baseURL}/post/category/${id}`)
      .then((response) => {
        setPosts(response.data.posts);

      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

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

  const formattedDate = moment(post.createdAt).format("DD/MM/YYYY HH:mm");

  return (
    <div className="details-container">
      {post && post.author && (
        <div className="user-avatar">
          <Link to={`/account/${post.author._id}`}>
            <img
              src={
                post.author.avatar.url ? post.author.avatar.url : defaultAvatar
              }
              alt=""
            />
            <strong>{post.author.username}</strong>
          </Link>
        </div>
      )}
      <div className="details">
        <div className="post-details-l" ref={cardContainer}>
          <AiOutlineLeft onClick={handelleft} />
          <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
            <a
              href={imageslide[index]}
              className="big-image"
              style={{ gridRow: "1 / 2", gridColumn: "1 / 3" }}
            >
              <img src={imageslide[index]} alt="post-image" />
            </a>
            <a
              href={imageslide[index2]}
              className="sub-images"
              style={{ gridRow: "2 / 3", gridColumn: "1 / 2" }}
            >
              <img
                src={imageslide[index2]}
                alt="post-image"
                className="images"
              />
            </a>
            <a
              href={imageslide[index3]}
              className="sub-images"
              style={{ gridRow: "2 / 3", gridColumn: "2 / 3" }}
            >
              <img
                src={imageslide[index3]}
                alt="post-image"
                className="images"
              />
            </a>
          </LightGallery>
          <AiOutlineRight onClick={handelright} />
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
            <p>{post.description}</p>
          </div>
          <div className="post-details-price">
            <p>Prix: {post.price} DA</p>
          </div>
          <div className="info">
            <li>
              <strong>Date: {formattedDate}</strong>
            </li>
            <li>
              <strong>Etat: {post.etat}</strong>
            </li>
            <li>
              <strong>Wilaya: {post.wilaya}</strong>
            </li>
            <li>
              <strong>Numéro De Téléphone: 0{post.num}</strong>
            </li>
          </div>
        </div>
      </div>

      {slicedData.length > 0 && (
        <div className="related-post" ref={cardContainer3}>
          <div className="related-title">
            <p>Annonces similaires</p>
          </div>
          <div className="user-post">
            {slicedData.map((post) => (
              <RelatedPost post={post} key={post._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Details;

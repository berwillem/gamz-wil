import Navbar from "../../Components/Navbar/Navbar";
import Slider from "../../Components/Slider/Slider";
import pubImg from "../../assets/images/pub.png";
import Footer from "../../Components/Footer/Footer";
import Pagination from "../../Components/Pagination/Pagination";
import Ads from "../../Components/Ads/Ads";
import "./Home.css";
import TopSelll from "../../Components/TopSelll/TopSelll";
import CategorySide from "../../Components/CategorySide/CategorySide";
import React, { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap, Power3 } from "gsap";
import { GetAllPosts } from "../../redux/reducers/Posts";
import axios from "axios";
import { useDispatch } from "react-redux";
const baseURL = import.meta.env.VITE_BASE_URL;

const images = [
  "https://picsum.photos/800/600?random=1",
  "https://picsum.photos/800/600?random=2",
  "https://picsum.photos/800/600?random=3",
  "https://picsum.photos/800/600?random=4",
];
function Home(isDarkMode) {
  const dispatch = useDispatch();
  const p = isDarkMode.isDarkMode;
  // animations:::
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
  // states::
  const [posts, setPosts] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [subcategoryId, setSubcategoryId] = useState(null);

  const handleCategoryChange = (categoryId) => {
    setCategoryId(categoryId);
  };

  const handleSubcategoryChange = (subcategoryId) => {
    setSubcategoryId(subcategoryId);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = `${baseURL}/post/`;

        if (categoryId) {
          url = `${baseURL}/post/category/${categoryId}`;
        } else if (subcategoryId) {
          url = `${baseURL}/post/subcategory/${subcategoryId}`;
        }

        const res = await axios.get(url);
        setPosts(res.data);
        dispatch(GetAllPosts(res.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [categoryId, subcategoryId]);


  console.log("heeeerrreee",subcategoryId);
  return (
    <div>
      <Navbar  p={p} onCategoryChange={handleCategoryChange} onSubcategoryChange={handleSubcategoryChange} />
      <Slider />
      <div className="home-center">
        <div className="Ads-category " ref={cardContainer2}>
          <CategorySide onSubcategoryChange={handleSubcategoryChange} />
          <Ads uri={pubImg} />
        </div>
        <div
          className="content-card"
          style={{
            opacity: 0,
            transform: 'translateY("100px")',
            width: "60%",
          }}
          ref={cardContainer3}
        >
          <Pagination posts={posts} />
        </div>
      </div>
      <div className="home-bottom">
        <TopSelll />
        <Ads uri={pubImg} />
      </div>
      <Footer onCategoryChange={handleCategoryChange} p={p} />
    </div>
  );
}

export default Home;

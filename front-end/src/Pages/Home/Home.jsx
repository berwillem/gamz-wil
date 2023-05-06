import Navbar from "../../Components/Navbar/Navbar";
import Slider from "../../Components/Slider/Slider";
import pubImg from "../../assets/images/pub.png";
import BackgroundSlider from "react-background-slider";
import Footer from "../../Components/Footer/Footer";
import Pagination from "../../Components/Pagination/Pagination";
import Ads from "../../Components/Ads/Ads";
import "./Home.css";
import TopSelll from "../../Components/TopSelll/TopSelll";
import CategorySide from "../../Components/CategorySide/CategorySide";
import React, { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap, Power3 } from "gsap";
import { GetAllPosts, baseUrl } from "../../redux/reducers/Posts";
import axios from "axios";
import { useDispatch } from "react-redux";

const images = [
  "https://picsum.photos/800/600?random=1",
  "https://picsum.photos/800/600?random=2",
  "https://picsum.photos/800/600?random=3",
  "https://picsum.photos/800/600?random=4",
];
function Home(isDarkMode) {
  const dispatch = useDispatch();

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

  const p = isDarkMode.isDarkMode;

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchText, setSearchText] = useState('iphone');
  
  

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(baseUrl + '/');
        setPosts(res.data);
        setFilteredPosts(posts.filter((post) =>
        post.title.toLowerCase().includes(searchText.toLowerCase())
      ))
       
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, []);
  return (
    <div>
      <Navbar p={p}  />
      <Slider />
      <div className="home-center">
        <div className="Ads-category " ref={cardContainer2}>
          <CategorySide />
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
          <Pagination posts={filteredPosts}  />
        </div>
      </div>
      <div className="home-bottom">
        <TopSelll />
        <Ads uri={pubImg} />
      </div>
      <Footer p={p} />
    </div>
  );
}

export default Home;

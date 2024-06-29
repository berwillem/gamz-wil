import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap, Power3 } from "gsap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import Slider from "../../Components/Slider/Slider";
import pubImg from "../../assets/images/pub.webp";
import Footer from "../../Components/Footer/Footer";
import Pagination from "../../Components/Pagination/Pagination";
import Ads from "../../Components/Ads/Ads";
import "./Home.css";
import TopSelll from "../../Components/TopSelll/TopSelll";
import CategorySide from "../../Components/CategorySide/CategorySide";
import { GetAllPosts } from "../../redux/reducers/Posts";
import { loginSuccess } from "../../redux/reducers/Auth";

const baseURL = import.meta.env.VITE_BASE_URL;
import subcategories from './../../Data/subCategory';
import { setCategory, setSubCategory } from "../../redux/reducers/filters";
import { getPosts, getPostsByCategory, getPostsBySubcategory } from "../../services/Posts";

function Home() {
  const dispatch = useDispatch();
 
  // animations
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
  useEffect(() => {
    const getQueryParams = () => {
      const queryParamsString = window.location.search.substring(1);
      const queryParams = new URLSearchParams(queryParamsString);
      return Object.fromEntries(queryParams.entries());
    };
    const userData = getQueryParams().user;
    if (userData) {
      try {
        const parsedUserData = JSON.parse(decodeURIComponent(userData));

        dispatch(loginSuccess({ user: parsedUserData }));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [dispatch]);

  // states
  const [posts, setPosts] = useState([]);
  // const [categoryId, setCategoryId] = useState(null);
  // const [subcategoryId, setSubcategoryId] = useState(null);
  const categoryId = useSelector((state)=> state.filters.category)
  const subcategoryId = useSelector((state)=> state.filters.subcategory)

  const handleCategoryChange = (categoryId) => {
    console.log("category change called", categoryId);
    dispatch(setCategory(categoryId));
  };

  const handleSubcategoryChange = (subcategoryId) => {
    dispatch(setSubCategory(subcategoryId));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        var res;

        if (categoryId) {
          res = await getPostsByCategory(categoryId)
        } else if (subcategoryId) {
          res = await getPostsBySubcategory(subcategoryId)
        }else{
          res = await getPosts()
        }
        //TODO: test it
        
        setPosts(res.data);
        dispatch(GetAllPosts(res.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [categoryId, subcategoryId]);

  return (
    <div>
   
      <Slider />
      <div className="home-center">
        <div className="Ads-category " ref={cardContainer2}>
          <CategorySide
            onCategoryChange={handleCategoryChange}
            onSubcategoryChange={handleSubcategoryChange}
          />
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
    
    </div>
  );
}

export default Home;

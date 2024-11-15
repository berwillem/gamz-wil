import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap, Power3 } from "gsap";
import { useDispatch, useSelector } from "react-redux";
import Slider from "../../Components/Slider/Slider";
import { Pagination } from "@mui/material";
import Ads from "../../Components/Ads/Ads";
import "./Home.css";
import TopSelll from "../../Components/TopSelll/TopSelll";
import CategorySide from "../../Components/CategorySide/CategorySide";
import { GetAllPosts } from "../../redux/reducers/Posts";
import { loginSuccess } from "../../redux/reducers/Auth";
import Post from "../../Components/Post/Post";
import image from "../../assets/no-result-diadem.webp";
import { setCategory, setSubCategory } from "../../redux/reducers/filters";
import {
  getPosts,
  getPostsByCategory,
  getPostsBySubcategory,
} from "../../services/Posts";
import { Helmet } from "react-helmet";

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

  const categoryId = useSelector((state) => state.filters.category);
  const subcategoryId = useSelector((state) => state.filters.subcategory);
  const searchText = useSelector((state) => state.filters.search);

  const [page, SetPage] = useState(1);
  const [totalPage, SetTotalPage] = useState(1);

  const handleCategoryChange = (categoryId) => {
    console.log("category change called", categoryId);
    dispatch(setCategory(categoryId));
  };

  const handleSubcategoryChange = (subcategoryId) => {
    dispatch(setSubCategory(subcategoryId));
  };

  useEffect(() => {
    SetPage(1);
  }, [categoryId, subcategoryId]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        var res;

        if (categoryId) {
          res = await getPostsByCategory(categoryId, page, searchText);
        } else if (subcategoryId) {
          res = await getPostsBySubcategory(subcategoryId, page, searchText);
        } else {
          res = await getPosts(page, searchText);
        }
        //TODO: test it

        setPosts(res.data.posts);

        SetTotalPage(res.data.nbrPage);

        dispatch(GetAllPosts(res.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [categoryId, subcategoryId, page, searchText]);

  const handlePageChange = (event, value) => {
    SetPage(value);
    window.scrollTo({ behavior: "smooth", top: "400" });
  };

  return (
    <>
      <Helmet>
        <title>home | Gamz </title>
      </Helmet>
      <div>
        <Slider />
        <div className="home-center">
          <div className="Ads-category " ref={cardContainer2}>
            <CategorySide
              onCategoryChange={handleCategoryChange}
              onSubcategoryChange={handleSubcategoryChange}
            />
            <Ads ad={1} />
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
            <div className="pagination-container">
              <div id="pagination-title">
                <p>Les annonces récentes</p>
              </div>

              {totalPage === 0 && <img src={image} alt="no post" />}

              {totalPage > 0 && (
                <>
                  <div className="dataContainer">
                    {posts.map((item, index) => (
                      <Post
                        key={item._id}
                        category={item.category.name}
                        img_post={item.images[0]}
                        name={item.title}
                        price={item.price}
                        id={item._id}
                      />
                    ))}
                  </div>

                  <Pagination
                    sx={{
                      padding: "30px 0",
                      "& .MuiPaginationItem-root": {
                        border: "1px solid",
                        color: "red",
                      },
                      "& .MuiPaginationItem-root:hover": {
                        backgroundColor: "red",
                        color: "white",
                      },
                      "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "red",
                        color: "white",
                      },
                    }}
                    count={totalPage}
                    page={page}
                    onChange={handlePageChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="home-bottom">
          <TopSelll />
          <Ads ad={2} />
        </div>
      </div>
    </>
  );
}

export default Home;

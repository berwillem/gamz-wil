import { Power3 } from "gsap";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Dashboard from "../../Components/Dashbord/Dashboard";
import { GetAllUsers } from "../../redux/reducers/users";
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
function Dashbord() {
  gsap.registerPlugin(ScrollTrigger);
  const [users, setUsers] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const dispatch = useDispatch();
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
    const getUsers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const sessionId = user.sessionId;
        const config = {
          headers: {
            "session-id": sessionId,
          },
        };
        const res = await axios.get(baseURL + "/user/", config);
        setUsers(res.data);
        dispatch(GetAllUsers(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    axios
      .get(baseURL + "/post/count")
      .then((response) => {
        setPostCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(baseURL + "/user/count")
      .then((response) => {
        setUserCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="home-container" >
      <div
        style={{
          opacity: 0,
          width: "100%",
        
        }}
        ref={cardContainer3}
      >
        <Dashboard users={users} userCount={userCount} postCount={postCount} />
      </div>
    </div>
  );
}

export default Dashbord;

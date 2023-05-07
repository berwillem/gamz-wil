import React from "react";
import "./User.css";

import { BsPhone } from "react-icons/bs";
import { FaStore } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import image1 from "../../assets/images/avatar.png";
import { Box } from "../../Data/Box";
import UserPost from "../UserPost/UserPost";
import Ads from "../Ads/Ads";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/Auth";

const boxSlice = Box.slice(0, 4);
const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  // const userAvatar = user.avatar.url;
  // const userBanner = user.banner.url;
function User({ user_name,  phone_number, address,banner,avatar,posts },) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
   
  };
  console.log({posts});
  return (
    <>
    <div className="user-container">
      <div className="user-l">
        <div className="user-l-content">
          <li>
            <Link
              to="/"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              Aceuille
              <AiOutlineHome />
            </Link>
          </li>
          <li>
            <Link
              to="/Details"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              Update Acount
              <CiUser />
            </Link>
          </li>
          <li onClick={handleLogout}>
            Logout
            <MdOutlineLogout />
          </li>
        </div>

        <Ads uri="https://electro.madrasthemes.com/wp-content/uploads/2016/03/ad-banner-sidebar.jpg" />
      </div>

      <div className="user-r">
        <div
          className="back-image"
          style={{
            backgroundImage:
              `url(${banner? banner:'https://demo2.chethemes.com/electro-dokan/wp-content/uploads/2018/01/flipkart_625x300_81431586162.jpg'})`
          }}
        >
          <div className="user-info">
            <div className="user-image-container">
              <img src={avatar ? avatar:image1} alt="" className="user-image" />
              <strong> {user_name} </strong>
            </div>

            <div className="user"></div>
            <div className="user">
              <ImLocation />
              <p>{address ? address:(<Link to="/Details">Add address</Link>)}</p>
            </div>
            <div className="user">
              <BsPhone />
              <p>{phone_number ? phone_number: (<Link to="/Details">Add phone number</Link>)}</p>
            </div>
            
          </div>
        </div>

        <div className="user-post">
          {boxSlice.map((i, key) => (
            <UserPost
              key={i.id}
              category={i.category}
              name={i.title}
              user_post_image={i.image}
              price={i.price}
            />
          ))}{" "}
        </div>
      </div>
    </div>
    </>
  );
}

export default User;

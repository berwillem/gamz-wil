import React from "react";
import "./User.css";
import defaultBanner from "../../assets/images/banner.webp"
import { BsPhone } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import image1 from "../../assets/images/avatar.webp";
import UserPost from "../UserPost/UserPost";
import Ads from "../Ads/Ads";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/Auth";

function User({ user_name,  phone_number, address,banner,avatar,posts,owner },) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
   
  };
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
              Accueil
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
             Mettre à jour le compte.
              <CiUser />
            </Link>
          </li>
          <li onClick={handleLogout}>
          Déconnexion
            <MdOutlineLogout />
          </li>
        </div>

        <Ads/>
      </div>

      <div className="user-r">
        <div
          className="back-image"
          style={{
            backgroundImage:
              `url(${banner? banner:defaultBanner})`
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
         
            <UserPost
            posts={posts}
            owner={owner}
            />
        
        </div>
      </div>
    </div>
    </>
  );
}

export default User;

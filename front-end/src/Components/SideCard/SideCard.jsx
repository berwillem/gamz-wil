import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
import { logout } from "../../redux/reducers/Auth";
import { useDispatch } from "react-redux";

const SideCard = () => {
  // variable
  const userId = JSON.parse(localStorage.getItem("user"))?.id || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //function
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
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
            Home
            <AiOutlineHome />
          </Link>
        </li>
        <li>
          <Link
            to={`/account/${userId}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            Account details
            <CiUser />
          </Link>
        </li>
        <li onClick={handleLogout}>
          Logout
          <MdOutlineLogout />
        </li>
      </div>
    </>
  );
};

export default SideCard;

import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
const SideCard = () => {
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
            to="/account"
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
        <li>
          Logout
          <MdOutlineLogout />
        </li>
      </div>
    </>
  );
};

export default SideCard;

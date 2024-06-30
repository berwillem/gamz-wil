import { useEffect, useState } from "react";
import { AiOutlineDashboard, AiOutlineHome } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import DashboardCard from "../DashboardCard/DashboardCard";
import "./Dashboard.css";
import UsersList from "../Users_list/UsersList";
import image from "../../assets/Svg/shape.svg";
import { Link, useNavigate } from "react-router-dom";
import DashboardCardStat from "../DashboardCard/DashboardCardStat";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/Auth";
const baseURL = import.meta.env.VITE_BASE_URL;

function Dashboard() {
  const [postCount, setPostCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUsers = async (page) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const sessionId = user.sessionId;
      const config = {
        headers: {
          "session-id": sessionId,
        },
      };
      const res = await axios.get(`${baseURL}/user?page=${page}`, config);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(logout());
        navigate("/");
      }
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    getUsers(page);
  }, [page]);

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
  console.log(users);
  return (
    <div className="dashboard-container">
      <div className="dashboard_l">
        <div className="user-l-dashboard">
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
              to="/Pub-manage"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              pub management
              <AiOutlineDashboard />
            </Link>
          </li>
          <li>
            <Link
              to="/pub-manage-mobile"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              pub management mobile
              <AiOutlineDashboard />
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
              Account details
              <CiUser />
            </Link>
          </li>
        </div>
      </div>
      <div className="user_dashboard_right">
        <div className="dashboard_card_container">
          <DashboardCard title="Total Users" number={userCount} url={image} />
          <DashboardCard title="Post number" number={postCount} url={image} />
          <DashboardCardStat></DashboardCardStat>
        </div>
        <div className="dashboard_container">
          <div className="dashboard_title">
            <p>Users List</p>
          </div>
          <div className="dashboard_titles">
            <li>ID</li>
            <li>Date</li>
            <li>Name</li>
            <li>Email</li>
            <li>Action</li>
          </div>
          <div className="dashboard_users">
            {users?.map((item, index) => (
              <UsersList
                key={item._id}
                name={item.username}
                id={item._id}
                date={item.createdAt.slice(0, 10)}
                email={item.email}
              />
            ))}
          </div>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

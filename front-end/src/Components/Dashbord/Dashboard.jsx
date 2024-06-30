import React, { useState, useEffect } from "react";
import { AiOutlineDashboard, AiOutlineHome } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import DashboardCard from "../DashboardCard/DashboardCard";
import "./Dashboard.css";
import UsersList from "../Users_list/UsersList";
import image from "../../assets/Svg/shape.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import imagestat from "../../assets/Svg/google-analytics-icon.svg";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/Auth";

const baseURL = import.meta.env.VITE_BASE_URL;

function Dashboard() {
  const [postCount, setPostCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [postByCategory, setPostByCategory] = useState([]);
  const [archive, setArchive] = useState([]);
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

    axios
      .get(baseURL + "/post/category/count")
      .then((res) => setPostByCategory(res.data))
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(baseURL + "/post/archive")
      .then((res) => setArchive(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Transforming data for PieChart
  const transformedData = postByCategory.map((item, index) => ({
    id: index,
    value: item.count,
    label: item.categoryName,
  }));

  // Transforming data for LineChart
  const soldInData = archive.map((item) => item.sold_in);
  const soldOutData = archive.map((item) => item.sold_out);
  const otherData = archive.map((item) => item.other);
  const xLabels = archive.map((_, index) => `Month ${index + 1}`);

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
        <div className="card">
          <DashboardCard title="Total Users" number={userCount} url={image} />
          <DashboardCard title="Post number" number={postCount} url={image} />
        </div>
      </div>
      <div className="user_dashboard_right">
        <div className="dashboard_card_container">
          <div className="chart">
            <div className="firstCol">
              <div className="googleAnalytique">
                <img src={imagestat} alt="" />
                <a href="https://analytics.google.com/analytics/web/?authuser=5#/p386017333/reports/intelligenthome?params=_u..nav%3Dmaui">
                  <button>
                    <h3>View Analytics</h3>
                  </button>
                </a>
              </div>
              <div className="statBox">
                <PieChart
                  series={[
                    {
                      data: transformedData,
                      innerRadius: 30,
                      outerRadius: 80,
                      paddingAngle: 5,
                      cornerRadius: 5,
                    },
                  ]}
                  width={700}
                  height={200}
                />
              </div>
            </div>
            <div className="statBox2">
              <LineChart
                width={700}
                height={250}
                series={[
                  { data: soldInData, label: "Sold In" },
                  { data: soldOutData, label: "Sold Out" },
                  { data: otherData, label: "Other" },
                ]}
                xAxis={[{ scaleType: "point", data: xLabels }]}
              />
            </div>
          </div>
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
            {users.map((item) => (
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

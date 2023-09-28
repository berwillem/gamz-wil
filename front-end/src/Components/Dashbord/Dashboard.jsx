import React, { useState } from "react";
import { AiOutlineDashboard, AiOutlineHome } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import DashboardCard from "../DashboardCard/DashboardCard";
import "./Dashboard.css";
import UsersList from "../Users_list/UsersList";
import image from "../../assets/Svg/shape.svg";
import { Link } from "react-router-dom";
import DashboardCardStat from "../DashboardCard/DashboardCardStat";

function Dashboard({ users, postCount, userCount }) {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15; // Number of users to display per page

  // Calculate the index of the first and last user on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Function to handle page changes
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
            <li>No</li>
            <li>ID</li>
            <li>Date</li>
            <li>Name</li>
            <li>Email</li>
            <li>Action</li>
          </div>

          <div className="dashboard_users">
            {currentUsers.map((item, index) => (
              <UsersList
                key={item._id}
                name={item.username}
                number={index + 1 + indexOfFirstUser}
                id={item._id}
                date={item.createdAt.slice(0, 10)}
                email={item.email}
              />
            ))}
          </div>
          <div className="pagination">
            {/* Generate pagination buttons */}
            {Array.from(
              { length: Math.ceil(users.length / usersPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import React from 'react'

import { AiOutlineDashboard, AiOutlineHome } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom';
export default function PubManageMobile() {
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
              to="/pub-manage-mobile"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              side pub management 
              <AiOutlineDashboard />
            </Link>
          </li>
      
        </div>
       
      </div>
      
     
    </div>
  )
}

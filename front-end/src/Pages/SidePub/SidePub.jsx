import React, { useState } from 'react'
import pubImg from "../../assets/images/pub.webp";
import './SidePub.css'
   
import { AiOutlineDashboard, AiOutlineHome } from "react-icons/ai";
import { Link } from 'react-router-dom';
export default function SidePub() {
  const [pub, setPub] = useState([{image:pubImg},{image:pubImg}])
    const [pub2, setPub2] = useState([{image:''},{image:''}])
  


 
    const handleFileChange = (index, event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newPub = [...pub];
          const newPub2 = [...pub2];
          newPub[index].image = reader.result;
          newPub2[index].image = file;
        
          setPub(newPub);
          setPub2(newPub2);
        };
        reader.readAsDataURL(file);
      }
    };
  
 
  return (
    <div className="dashboard-container">

      <div className="dashboard_l">
        <div className="user-l-dashboard">
          <li>
            <Link
              to="/Dashboard"
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
              to="/sidePub"
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
      <form className="user_dashboard_right side">
  <div className="pubCrad">
  <div className="Ads-container">
      <img src={pub[0].image} alt="pub-image" />
      <input type="file" className='sid' onChange={(e) => handleFileChange(0, e)} />
    </div>
    <div className="Ads-container">
      <img src={pub[1].image}alt="pub-image" />
      <input type="file" className='sid' onChange={(e) => handleFileChange(1, e)} />
    </div>
  </div>
    <div className="btn">
      <button>  valider</button>
    </div>
      </form>
      
     
    </div>
  )
}


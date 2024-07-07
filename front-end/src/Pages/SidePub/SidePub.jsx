import React, { useEffect, useState } from "react";
import pubImg from "../../assets/images/pub.webp";
import "./SidePub.css";
import { AiOutlineDashboard, AiOutlineHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { createSidePub, getSidePub } from "../../services/Pubs";
import Swal from "sweetalert2";

export default function SidePub() {
  const [pub, setPub] = useState([
    { image: pubImg, url: "" },
    { image: pubImg, url: "" },
  ]);
  const [pub2, setPub2] = useState([
    { image: pubImg, url: "" },
    { image: pubImg, url: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getSidePub(1).then((res) => {
      setPub((state) => [
        { image: res.data.url, url: res.data.redirect },
        ...state.slice(1),
      ]);
      setPub2((state) => [
        { image: res.data.url, url: res.data.redirect },
        ...state.slice(1),
      ]);
    });

    getSidePub(2).then((res) => {
      setPub((state) => [
        ...state.slice(0, 1),
        { image: res.data.url, url: res.data.redirect },
      ]);
      setPub2((state) => [
        ...state.slice(0, 1),
        { image: res.data.url, url: res.data.redirect },
      ]);
    });
  }, []);

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

  const handleLinkChange = (index, event) => {
    const newPub = [...pub];
    const newPub2 = [...pub2];
    newPub[index].url = event.target.value;
    newPub2[index].url = event.target.value;
    setPub(newPub);
    setPub2(newPub2);
  };

  const handleSubmit = () => {
    setLoading(true);
    const fd = new FormData();

    pub2[0].image instanceof File
      ? fd.append("cardOneImage", pub2[0].image)
      : fd.append("cloudinaryImage1", pub2[0].image);
    pub2[1].image instanceof File
      ? fd.append("cardTwoImage", pub2[1].image)
      : fd.append("cloudinaryImage2", pub2[1].image);
    fd.append("cardOneLink", pub2[0].url);
    fd.append("cardTwoLink", pub2[1].url);

    const user = JSON.parse(localStorage.getItem("user"));
    const sessionId = user.sessionId;
    createSidePub(fd, sessionId)
      .then(() => {
        Swal.fire("Success", "Side Pub created successfully", "success");
        setLoading(false);
        navigate("/Dashboard");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Something went wrong", "error");
        setLoading(false);
      });
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
          {pub.map((pubItem, index) => (
            <div key={index} className="Ads-container">
              <img src={pubItem.image} alt="pub-image" />
              <input
                type="file"
                className="sid"
                onChange={(e) => handleFileChange(index, e)}
              />
              <label htmlFor="">Enter votre Url</label>
              <input
                type="text"
                value={pubItem.url}
                onChange={(e) => handleLinkChange(index, e)}
              />
            </div>
          ))}
        </div>
        <div className="btn">
          <button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Loading..." : "Valider"}
          </button>
        </div>
      </form>
    </div>
  );
}

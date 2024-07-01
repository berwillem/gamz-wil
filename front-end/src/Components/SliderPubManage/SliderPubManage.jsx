import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./SliderPubManage.css";
import image from "../../assets/images/banner.webp";
import image2 from "../../assets/images/SMALL1.webp";
import image3 from "../../assets/images/SMALL2.webp";
import { FaLink } from "react-icons/fa";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { AiOutlineDashboard, AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { createPub } from "../../services/Pubs";
import  Swal  from 'sweetalert2';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
};

export default function SliderPubManage() {
  const [open, setOpen] = useState(false);
  const [linkType, setLinkType] = useState({ index: null, type: null });
  const handleOpen = (index, type) => {
    setLinkType({ index, type });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const [pub, setPub] = useState([
    {
      image: image,
      title: "title",
      link: "",
      seconde: { image: image2, title: "title", link: "" },
      third: { image: image3, title: "title", link: "" },
    },
  ]);
  const [pub2, setPub2] = useState([
    {
      image: image,
      title: "title",
      link: "",
      seconde: { image: image2, title: "title", link: "" },
      third: { image: image3, title: "title", link: "" },
    },
  ]);

  const addSlide = () => {
    setPub([
      ...pub,
      {
        image: image,
        title: "title",
        link: "",
        seconde: { image: image2, title: "title", link: "" },
        third: { image: image3, title: "title", link: "" },
      },
    ]);
    setPub2([
      ...pub2,
      {
        image: image,
        title: "title",
        link: "",
        seconde: { image: image2, title: "title", link: "" },
        third: { image: image3, title: "title", link: "" },
      },
    ]);
  };

  const deletePub = (index) => {
    setPub(pub.filter((_, i) => i !== index));
    setPub2(pub2.filter((_, i) => i !== index));
  };
  const handleFileChange = (index, type, subIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPub = [...pub];
        const newPub2 = [...pub2];
        if (type === "main") {
          newPub[index].image = reader.result;
          newPub2[index].image = file;
        } else if (type === "seconde") {
          newPub[index].seconde.image = reader.result;
          newPub2[index].seconde.image = file;
        } else if (type === "third") {
          newPub[index].third.image = reader.result;
          newPub2[index].third.image = file;
        }
        setPub(newPub);
        setPub2(newPub2);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleTitleChange = (index, type, event) => {
    const newPub = [...pub];
    const newPub2 = [...pub2];
    if (type === "main") {
      newPub[index].title = event.target.value;
      newPub2[index].title = event.target.value;
    } else if (type === "seconde") {
      newPub[index].seconde.title = event.target.value;
      newPub2[index].seconde.title = event.target.value;
    } else if (type === "third") {
      newPub[index].third.title = event.target.value;
      newPub2[index].third.title = event.target.value;
    }
    setPub(newPub);
    setPub2(newPub2);
  };
  const handleLinkChange = (event) => {
    const { index, type } = linkType;
    const newPub = [...pub];
    const newPub2 = [...pub2];
    if (type === "main") {
      newPub[index].link = event.target.value;
      newPub2[index].link = event.target.value;
    } else if (type === "seconde") {
      newPub[index].seconde.link = event.target.value;
      newPub2[index].seconde.link = event.target.value;
    } else if (type === "third") {
      newPub[index].third.link = event.target.value;
      newPub2[index].third.link = event.target.value;
    }
    setPub(newPub);
    setPub2(newPub2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"))
    const sessionId = user.sessionId
    const fd = new FormData()
    pub2.forEach((pub, index) => {
      fd.append("pub", pub.image)
      fd.append("title", pub2[0].title)
      fd.append("links", pub.link)
    })
    fd.append("cardOneImage", pub2[0].seconde.image)
    fd.append("cardOneTitle", pub2[0].seconde.title)
    fd.append("cardOneLink", pub2[0].seconde.link)

    fd.append("cardTwoImage", pub2[0].third.image)
    fd.append("cardTwoTitle", pub2[0].third.title)
    fd.append("cardTwoLink", pub2[0].third.link)
    createPub(fd, sessionId)
    .then(()=> {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'worked',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .catch((err) => {
      console.error(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    })
  }

  return (
    <div className="dashboard-container dash-pub">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="boxModel" sx={style}>
          <label htmlFor="">Enter votre Url</label>
          <input type="text" id="link-input" onChange={handleLinkChange} />
          <button onClick={handleClose}>Valid</button>
        </Box>
      </Modal>
      <form className="user_dashboard_right">
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

        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {pub.map((pub, index) => (
            <SwiperSlide key={index}>
              <FaLink
                className="linkIcon"
                onClick={() => handleOpen(index, "main")}
              />
              <input
                type="file"
                className="bigimage"
                onChange={(e) => handleFileChange(index, "main", null, e)}
              />
              <span onClick={() => deletePub(index)} className="delete">
                delete
              </span>
              <img src={pub.image} alt="" />
              <div className="infos">
                <div className="info_lefts">
                  <input
                    type="text"
                    value={pub.title}
                    onChange={(e) => handleTitleChange(index, "main", e)}
                    placeholder="Main Title"
                  />
                  <button className="btnPlus">En savoir plus !</button>
                </div>
                <div className="info_rights">
                  <div className="div">
                    <FaLink
                      className="linkIcon"
                      onClick={() => handleOpen(index, "seconde")}
                    />
                    <img src={pub.seconde.image} alt="" />{" "}
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(index, "seconde", 0, e)}
                    />
                    <input
                      type="text"
                      value={pub.seconde.title}
                      onChange={(e) => handleTitleChange(index, "seconde", e)}
                    />
                  </div>

                  <div className="div">
                    <FaLink
                      className="linkIcon"
                      onClick={() => handleOpen(index, "third")}
                    />
                    <img src={pub.third.image} alt="" />
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(index, "third", 0, e)}
                    />
                    <input
                      type="text"
                      value={pub.third.title}
                      onChange={(e) => handleTitleChange(index, "third", e)}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="btn">
          <button type="button" onClick={addSlide}>
            addSlide
          </button>
          <button type="submit" onClick={handleSubmit}>valider le slide</button>
        </div>
      </form>
    </div>
  );
}

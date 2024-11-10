import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import image from "../../assets/images/banner.webp";

import "./PubManageMobile.css";
import iphone from "../../assets/images/iphone.webp";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { AiOutlineDashboard, AiOutlineHome } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { FaLink } from "react-icons/fa";
import { createPubMobil, getNoCacheMobile } from "../../services/Pubs";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";

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

export default function PubManageMobile() {
  const [open, setOpen] = useState(false);
  const [linkType, setLinkType] = useState({ index: null, type: null });
  const [imagePub, setImagePub] = useState([]);
  const [imagePub1, setImagePub1] = useState();
  const [imagePub2, setImagePub2] = useState();
  const [loading, setLoading] = useState(false);
  const [pubs, setPubs] = useState({});
  const [pubs2, setPubs2] = useState({});
  const navigate = useNavigate();
  const handleOpen = (index, type) => {
    setLinkType({ index, type });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    getNoCacheMobile()
      .then((response) => {
        setPubs(response.data);
        setPubs2(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addNewPub = () => {
    const newPub = {
      url: image,
      publicId: "pubs/newad",
    };

    setPubs((prevPubs) => ({
      ...prevPubs,
      pub: [...prevPubs.pub, newPub],
    }));
    setPubs2((prevPubs2) => ({
      ...prevPubs2,
      pub: [...prevPubs2.pub, newPub],
    }));
  };

  const deleteAd = (index) => {
    setPubs((prevPubs) => ({
      ...prevPubs,
      pub: prevPubs.pub.filter((_, i) => i !== index),
    }));
    setPubs2((prevPubs) => ({
      ...prevPubs,
      pub: prevPubs.pub.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (index, type, subIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPubs = { ...pubs };

        if (type === "main") {
          newPubs.pub[index].url = reader.result;
          setImagePub((prevImagePub) => [...prevImagePub, file]);
        } else if (type === "seconde") {
          newPubs.cardOne.cardOneImage.url = reader.result;
          setImagePub1(file);
        } else if (type === "third") {
          newPubs.cardTwo.cardTwoImage.url = reader.result;
          setImagePub2(file);
        }

        setPubs(newPubs);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (index, type, event) => {
    const newPubs = { ...pubs };
    const newPubs2 = { ...pubs2 };
    if (type === "main") {
      newPubs.title = event.target.value;
      newPubs2.title = event.target.value;
    } else if (type === "seconde") {
      newPubs.cardOne.title = event.target.value;
      newPubs2.cardOne.title = event.target.value;
    } else if (type === "third") {
      newPubs.cardTwo.title = event.target.value;
      newPubs2.cardTwo.title = event.target.value;
    }
    setPubs(newPubs);
    setPubs2(newPubs2);
  };

  const handleLinkChange = (event) => {
    const { index, type } = linkType;
    const newPubs = { ...pubs };
    const newPubs2 = { ...pubs2 };
    if (type === "main") {
      newPubs.redirectUrls[index].url = event.target.value;
      newPubs2.redirectUrls[index].url = event.target.value;
    } else if (type === "seconde") {
      newPubs.cardOne.redirect = event.target.value;
      newPubs2.cardOne.redirect = event.target.value;
    } else if (type === "third") {
      newPubs.cardTwo.redirect = event.target.value;
      newPubs2.cardTwo.redirect = event.target.value;
    }
    setPubs(newPubs);
    setPubs2(newPubs2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const sessionId = user.sessionId;
    const fd = new FormData();
    imagePub.forEach(async (pub) => {
      fd.append("pub", pub ? await imageCompression(pub, options) : pub);
    });

    pubs2.pub?.forEach((pub) => {
      if (pub.url.includes("cloudinary")) {
        fd.append("cloudinaryPub", pub.url);
      }
    });

    fd.append("title", pubs.title);
    pubs.redirectUrls.forEach((redirectUrls) => {
      fd.append("links", redirectUrls.url);
    });
    imagePub1 instanceof File
      ? fd.append("cardOneImage", await imageCompression(imagePub1, options))
      : fd.append("cloudinaryImage1", pubs?.cardOne?.cardOneImage.url);
    fd.append("cardOneTitle", pubs.cardOne.title);
    fd.append("cardOneLink", pubs.cardOne.redirect);

    imagePub2 instanceof File
      ? fd.append("cardTwoImage", await imageCompression(imagePub2, options))
      : fd.append("cloudinaryImage2", pubs?.cardTwo?.cardTwoImage.url);
    fd.append("cardTwoTitle", pubs.cardTwo.title);
    fd.append("cardTwoLink", pubs.cardTwo.redirect);

    createPubMobil(fd, sessionId)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "worked",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        navigate("/Dashboard");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setLoading(false);
      });
  };

  return (
    <div className="dashboard-container">
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
      <form className="user_dashboard_right">
        <div className="btn">
          <button type="button" onClick={addNewPub}>
            addSlide
          </button>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Loading..." : "valider le slide"}
          </button>
        </div>
        <div className="iphoneContent">
          <img className="iphone" src={iphone} alt="" />
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper mobil"
          >
            {pubs?.pub?.map((pub, index) => (
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
                <span onClick={() => deleteAd(index)} className="delete">
                  delete
                </span>
                <img src={pub?.url} alt="" />
                <div className="infos">
                  <div className="info_lefts">
                    <input
                      type="text"
                      value={pubs?.title}
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
                      <img src={pubs?.cardOne?.cardOneImage.url} alt="" />{" "}
                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileChange(index, "seconde", 0, e)
                        }
                      />
                      <input
                        type="text"
                        value={pubs?.cardOne?.title}
                        onChange={(e) => handleTitleChange(index, "seconde", e)}
                      />
                    </div>

                    <div className="div">
                      <FaLink
                        className="linkIcon"
                        onClick={() => handleOpen(index, "third")}
                      />
                      <img src={pubs?.cardTwo?.cardTwoImage.url} alt="" />{" "}
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(index, "third", 0, e)}
                      />
                      <input
                        type="text"
                        value={pubs?.cardTwo?.title}
                        onChange={(e) => handleTitleChange(index, "third", e)}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </form>
    </div>
  );
}

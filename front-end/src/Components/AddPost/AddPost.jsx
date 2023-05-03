import React, { useState } from "react";
import Ads from "../Ads/Ads";
import "./AddPost.css";
import image from "../../assets/Svg/undraw_image_post_re_25wd.svg";
import Select from "react-select";
import SideCard from "../SideCard/SideCard";
import { wilaya } from "../../Data/wilaya";
import { category } from "../../Data/category";

// needs befor components :::

const costumeStyle = [{}];
const options = wilaya.map((wilaya) => ({
  value: wilaya.name,
  label: wilaya.name,
}));

// component start ::::

function AddPost() {
  // * states :::
  const [principalImage, setPrincipalImage] = useState(image);
  const [otherImages, setOtherImages] = useState([image, image]);
  const [selectedOptions, setSelectedOptions] = useState(null);



// handle functions ::::
  const handlePrincipalImageChange = (event) => {
    setPrincipalImage(URL.createObjectURL(event.target.files[0]));
  };
  const handleOtherImageChange = (index, event) => {
    const newOtherImages = [...otherImages];
    newOtherImages[index] = URL.createObjectURL(event.target.files[0]);
    setOtherImages(newOtherImages);
  };
  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };


  // style ??
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "var(--background-color)",
      color: "var(--text-color)",
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: "var(--background-color)",
      color: "var(--text-color)",
    }),
  };

  return (
    <>
    <div className="account-center">
      <div className="user-l">
        <SideCard/>
        <Ads uri="https://electro.madrasthemes.com/wp-content/uploads/2016/03/ad-banner-sidebar.jpg" />
      </div>
      <div className="add-content">
        <div className="add-post-l">
          <div className="add-big-image">
            <p>Choose The Principal Image</p>
            <div className="principal-image">
              <label htmlFor="principal-image-input">
                {principalImage ? (
                  <img
                    src={principalImage}
                    alt="Principal"
                    style={{
                      width: "400px",
                      border: "2px solid #e81a2a ",
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <span>Click to upload image</span>
                )}{" "}
              </label>
              <input
                type="file"
                id="principal-image-input"
                accept="image/*"
                onChange={handlePrincipalImageChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="add-images">
            <p>Choose Other Images</p>
            <div className="images-sub">
              {[0, 1].map((index) => (
                <div key={index}>
                  <label htmlFor={`other-image${index}-input`}>
                    {otherImages[index] ? (
                      <img
                        src={otherImages[index]}
                        alt={`Other ${index}`}
                        style={{
                          width: "150px",
                          cursor: "pointer",
                          border: "2px solid #e81a2a ",
                          borderRadius: "10px",
                        }}
                      />
                    ) : (
                      <span>Click to upload image</span>
                    )}{" "}
                  </label>
                  <input
                    type="file"
                    id={`other-image${index}-input`}
                    accept="image/*"
                    onChange={(event) => handleOtherImageChange(index, event)}
                    style={{ display: "none" }}
                  />
                </div>
              ))}{" "}
            </div>
          </div>
        </div>
        <div className="add-post-r">
          <div className="add-category">
            <p>Choose The Category for your post</p>
            <Select
              value={selectedOptions}
              onChange={handleSelectChange}
              options={category}
              isMulti={false}
              placeholder="Select countries"
              styles={customStyles}
            />
          </div>
          <div className="add-title">
            <p>Write a Title for your product</p>
            <input
              type="text"
              name="title"
              id=""
              placeholder="write title for your product"
            />
          </div>
          <div className="add-description">
            <p>Write Description for your product</p>
            <textarea
              name="description"
              id=""
              //  value={des}
              cols="30"
              rows="10"
              placeholder="write some lines to describe your product "
            ></textarea>
          </div>
          <div className="add-title">
            <p>write your phone number</p>
            <input
              type="tel"
              pattern="[0-9]{10}"
              name="phoneNumber"
              id=""
              placeholder="write your phone number"
            />
          </div>

          <div className="add-price">
            <p>fix price for your product</p>
            <input type="number" placeholder="00" name="price" id="" />
          </div>
          <div className="add-price">
            <p>add your willaya</p>

            <Select
              value={selectedOptions}
              onChange={handleSelectChange}
              options={options}
              isMulti={false}
              placeholder="Select countries"
              styles={customStyles}
            />
          </div>

          <button type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default AddPost;

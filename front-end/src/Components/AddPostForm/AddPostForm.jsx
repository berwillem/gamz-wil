import { useState, useEffect } from "react";
import Ads from "../Ads/Ads";
import "./AddPostForm.css";
import image from "../../assets/Svg/undraw_image_post_re_25wd.svg";
import Select from "react-select";
import SideCard from "../SideCard/SideCard";
import { wilaya } from "../../Data/wilaya";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { options_state } from "../../Data/etat";

// needs befor :::
const baseURL = import.meta.env.VITE_BASE_URL;
const options = wilaya.map((wilaya) => ({
  value: wilaya.name,
  label: wilaya.name,
}));
const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : "";
const id = user ? user.id : "";
const isLoggedIn = localStorage.getItem("isLoggedIn");

// Component start :

function AddPostForm({ categories, fetchSubcategories }) {
  // ***STATES***

  // images states:

  const [principalImage, setPrincipalImage] = useState(image);
  const [principalImageFile, setPrincipalImageFile] = useState(null);
  const [otherImages, setOtherImages] = useState([image, image]);
  const [otherImagesFile, setOtherImagesFile] = useState([]);

  // select states:

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subcategories2, setSubcategories2] = useState([]);
  const [selectedSubCategory2, setSelectedSubCategory2] = useState([]);
  const [subcategories3, setSubcategories3] = useState([]);

  // form states:

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [etat, setEtat] = useState("");
  const navigate = useNavigate();

  // ***HANDELE FUNCTIONS ***

  // images handle:

  const handlePrincipalImageChange = (event) => {
    const file = event.target.files[0];
    setPrincipalImage(URL.createObjectURL(file));
    setPrincipalImageFile(file);
  };
  const handleOtherImageChange = (index, event) => {
    const newOtherImages = [...otherImages];
    newOtherImages[index] = URL.createObjectURL(event.target.files[0]);
    setOtherImages(newOtherImages);
    const newOtherImagesFiles = [...otherImagesFile]; // copy the existing array
    newOtherImagesFiles[index] = event.target.files[0]; // add the new file to the end
    setOtherImagesFile(newOtherImagesFiles);
  };

  //  categories handle:

  const handleCategoryChange = async (selectedOption) => {
    setSelectedCategory(selectedOption);
    try {
      if (selectedOption) {
        const categoryId = selectedOption.value;
        const subcategoriesData = await fetchSubcategories(categoryId);
        setSubcategories(subcategoriesData);
      } else {
        setSubcategories([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubcategoryChange = async (selectedOption) => {
    setSelectedSubCategory(selectedOption);
    try {
      if (selectedOption) {
        const categoryId = selectedOption.value;
        const subcategoriesData = await fetchSubcategories(categoryId);
        setSubcategories2(subcategoriesData);
      } else {
        setSubcategories2([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubcategory2Change = async (selectedOption) => {
    setSelectedSubCategory2(selectedOption);
    try {
      if (selectedOption) {
        const categoryId = selectedOption.value;
        const subcategoriesData = await fetchSubcategories(categoryId);
        setSubcategories3(subcategoriesData);
      } else {
        setSubcategories3([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // other handlers :

  const handleSelectwilayaChange = (wilaya) => {
    setWilaya(wilaya.value);
  };

  const handleConditionChange = (selectedOption) => {
    if (selectedOption) {
      setEtat(selectedOption.value);
    } else {
      setEtat(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", selectedCategory.value);
    if (selectedSubCategory || selectedSubCategory2) {
      const subcategories = [];
      if (selectedSubCategory) {
        subcategories.push(selectedSubCategory.value);
      }
      if (selectedSubCategory2) {
        subcategories.push(selectedSubCategory2.value);
      }
      formData.append("subcategories", subcategories);
    }
    formData.append("wilaya", wilaya);
    formData.append("etat", etat);
    formData.append("commune", "alger");
    formData.append("num", phone);
    formData.append("author", id);
    formData.append("images", principalImageFile);
    formData.append("images", otherImagesFile[0]);
    formData.append("images", otherImagesFile[1]);
    try {
      const res = await axios.post(baseURL + `/post/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your post has been create successfully!",
      });
      navigate(`/account/${id}`);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: {err},
      })
    }
  };

  // style ::
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "var(--background-color)",
      color: "var(--text-color)",
      margin: "20px 0px",
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: "var(--background-color)",
      color: "var(--text-color)",
    }),
  };

  // component start:::

  return (
    <>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div className="account-center">
          <div className="user-l">
            {isLoggedIn === "true" ? <SideCard /> : null}
            <Ads />
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
                options={categories.map((category) => ({
                  value: category._id,
                  label: category.name,
                }))}
                value={selectedCategory}
                onChange={handleCategoryChange}
                placeholder="Select a category"
                styles={customStyles}
              />
              {selectedCategory && (
                <div className="add-category">
                  <p>Choose The Subcategory for your post</p>
                  <Select
                    options={subcategories.map((subcategory) => ({
                      value: subcategory._id,
                      label: subcategory.name,
                    }))}
                    value={selectedSubCategory}
                    onChange={handleSubcategoryChange}
                    placeholder="Select a subcategory"
                    styles={customStyles}
                  />
                </div>
              )}
              {selectedSubCategory && (
                <div className="add-category">
                  <p>Choose The Subcategory2 for your post</p>
                  <Select
                    options={subcategories2.map((subcategory) => ({
                      value: subcategory._id,
                      label: subcategory.name,
                    }))}
                    value={selectedSubCategory2}
                    onChange={handleSubcategory2Change}
                    placeholder="Select a subcategory"
                    styles={customStyles}
                  />
                </div>
              )}
              <div className="add-category">
                <p>Choose The Condition for your post</p>
                <Select
                  value={options_state.find((option) => option.value === etat)}
                  onChange={handleConditionChange}
                  options={options_state}
                  isClearable
                  placeholder="Select an option"
                  styles={customStyles}
                />
              </div>
            </div>
            <div className="add-title">
              <p>Write a Title for your product</p>
              <input
                type="text"
                name="title"
                value={title}
                id=""
                placeholder="write title for your product"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="add-description">
              <p>Write Description for your product</p>
              <textarea
                name="description"
                id=""
                value={description}
                cols="30"
                rows="10"
                placeholder="write some lines to describe your product "
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="add-title">
              <p>write your phone number</p>
              <input
                type="tel"
                pattern="[0-9]{10}"
                name="phoneNumber"
                id=""
                value={phone}
                placeholder="write your phone number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="add-price">
              <p>fix price for your product</p>
              <input
                type="number"
                placeholder="00"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                id=""
              />
            </div>
            <div className="add-price">
              <p>add your willaya</p>

              <Select
                value={wilaya.value}
                onChange={handleSelectwilayaChange}
                options={options}
                isMulti={false}
                placeholder="Select wilaya"
                styles={customStyles}
              />
            </div>
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddPostForm;
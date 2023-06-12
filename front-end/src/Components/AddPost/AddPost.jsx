import { useState, useEffect } from "react";
import Ads from "../Ads/Ads";
import "./AddPost.css";
import image from "../../assets/Svg/undraw_image_post_re_25wd.svg";
import Select from "react-select";
import SideCard from "../SideCard/SideCard";
import { wilaya } from "../../Data/wilaya";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { options_state } from "../../Data/etat";
import { fetchCategories, getCategories } from "../../Data/category";

// needs befor components :::
const baseURL = import.meta.env.VITE_BASE_URL;
const options = wilaya.map((wilaya) => ({
  value: wilaya.name,
  label: wilaya.name,
}));
const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : "";
const id = user ? user.id : "";
console.log(id);

// component start ::::

function AddPost() {
  // * states :::
  const [principalImage, setPrincipalImage] = useState(image);
  const [principalImageFile, setPrincipalImageFile] = useState(null);
  const [otherImages, setOtherImages] = useState([image, image]);
  const [otherImagesFile, setOtherImagesFile] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [subcats, setSubcats] = useState(null);
  const [subcatschildren, setSubcatschildren] = useState(null);
  const [selectedSubcatschildren, setSelectedSubcatschildren] =
    useState(subcatschildren);
  const [selectedSubcats, setSelectedSubcats] = useState(subcats);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [etat, setEtat] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  // handle functions ::::
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

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
  const handleSubCategoryChange = (selectedSubcats) => {
    setSelectedSubcats(selectedSubcats);
  };
  const handleSubCategoryChildrenChange = (selectedSubcatschildren) => {
    setSelectedSubcatschildren(selectedSubcatschildren);
  };
  const handleSelectwilayaChange = (wilaya) => {
    setWilaya(wilaya.value);
  };
  const handleChange = (selectedOption) => {
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
    formData.append("category", selectedOptions.value);
    formData.append("subcategories", [selectedSubcats.value]);
    formData.append("wilaya", wilaya);
    formData.append("etat", etat);
    formData.append("commune", "alger");
    formData.append("num", phone);
    formData.append("author", id);
    formData.append("images", principalImageFile);
    formData.append("images", otherImagesFile[0]);
    formData.append("images", otherImagesFile[1]);
    console.log("état",etat);
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
      console.log(err);
    }
  };
  // api calls::
  useEffect(() => {
    if (selectedOptions) {
      axios
        .get(baseURL + `/category/${selectedOptions.value}`)
        .then((response) => {
          const subcatNames = response.data.map((subcat) => ({
            value: subcat._id,
            label: subcat.name,
          }));
          setSubcats(subcatNames);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  }, [selectedOptions]);

  useEffect(() => {
    if (selectedSubcats) {
      axios
        .get(baseURL + `/category/${selectedSubcats.value}`)
        .then((response) => {
          const subcatChildrenNames = response.data.map((subcat) => ({
            value: subcat._id,
            label: subcat.name,
          }));
          setSubcatschildren(subcatChildrenNames);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  }, [selectedSubcats]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCategories();
        const fetchedCategories = getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
  const isLoggedIn = localStorage.getItem("isLoggedIn");
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
                value={selectedOptions}
                onChange={handleSelectChange}
                options={categories.map((category) => ({
                  value: category._id,
                  label: category.name,
                }))}
                isMulti={false}
                placeholder="Select category"
                styles={customStyles}
              />

              {subcats && subcats.length > 0 && (
                <div className="add-category">
                  <p>Choose The SubCategory for your post</p>
                  <Select
                    value={selectedSubcats}
                    onChange={handleSubCategoryChange}
                    options={subcats}
                    isMulti={false}
                    placeholder="Select subcategory"
                    styles={customStyles}
                    getOptionLabel={(option) => option.label}
                  />
                </div>
              )}
              {subcatschildren &&
                subcatschildren.length > 0 &&
                subcats &&
                subcats.length > 0 && (
                  <div className="add-category">
                    <p>Choose The SubCategory for your post</p>
                    <Select
                      value={selectedSubcatschildren}
                      onChange={handleSubCategoryChildrenChange}
                      options={subcatschildren}
                      isMulti={false}
                      placeholder="Select subcategory"
                      styles={customStyles}
                      getOptionLabel={(option) => option.label}
                    />
                  </div>
                )}
              <div className="add-category">
                <p>Choose The Condition for your post</p>
                <Select
                  value={options_state.find((option) => option.value === etat)}
                  onChange={handleChange}
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

export default AddPost;

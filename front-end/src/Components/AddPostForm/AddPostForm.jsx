import { useEffect, useState } from "react";
import Ads from "../Ads/Ads";
import "./AddPostForm.css";
import image from "../../assets/ADDPHOTO.webp";
import Select from "react-select";
import SideCard from "../SideCard/SideCard";
import { wilaya } from "../../Data/wilaya";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { options_state } from "../../Data/etat";
import { createPost } from "../../services/Posts";
import { useDispatch } from "react-redux";
import {
  createPostFailure,
  createPostStart,
  createPostSuccess,
} from "../../redux/reducers/Posts";
import imageCompression from "browser-image-compression";

// needs befor :::
const baseURL = import.meta.env.VITE_BASE_URL;
const options = wilaya.map((wilaya) => ({
  value: wilaya.name,
  label: wilaya.name,
}));
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
  const [selectedSubCategory3, setSelectedSubCategory3] = useState([]);
  const [subcategories4, setSubcategories4] = useState([]);
  const [selectedSubCategory4, setSelectedSubCategory4] = useState([]);

  // form states:

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [etat, setEtat] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : "";
    const id = user ? user.id : null;
    setId(id);
  }, []);

  const dispatch = useDispatch();

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
    setSelectedSubCategory(null);
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
    setSelectedSubCategory2(null);
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
    setSelectedSubCategory3(null);
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
  const handleSubcategory3Change = async (selectedOption) => {
    setSelectedSubCategory3(selectedOption);
    setSelectedSubCategory4(null);
    try {
      if (selectedOption) {
        const categoryId = selectedOption.value;
        const subcategoriesData = await fetchSubcategories(categoryId);
        setSubcategories4(subcategoriesData);
      } else {
        setSubcategories4([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubcategory4Change = async (selectedOption) => {
    setSelectedSubCategory4(selectedOption);
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
    setLoading(true);
    window.scrollTo({ top: 300 });
    if (!id) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "connectez vous d'abord !",
      });
    }
    if (
      !title ||
      !description ||
      !phone ||
      !price ||
      !selectedCategory ||
      !wilaya ||
      !etat
    ) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the required fields",
      });
      return;
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", selectedCategory.value);
    if (selectedSubCategory) {
      formData.append("subcategories", selectedSubCategory.value);
    }
    if (selectedSubCategory2 && selectedSubCategory2.value) {
      formData.append("subcategories", selectedSubCategory2.value);
    }
    if (selectedSubCategory3 && selectedSubCategory3.value) {
      formData.append("subcategories", selectedSubCategory3.value);
    }
    if (selectedSubCategory4 && selectedSubCategory4.value) {
      formData.append("subcategories", selectedSubCategory4.value);
    }
    formData.append("wilaya", wilaya);
    formData.append("etat", etat);
    //FIXME: commune constante
    formData.append("commune", "alger");
    formData.append("num", phone);
    formData.append("author", id);
    formData.append(
      "images",
      principalImageFile
        ? await imageCompression(principalImageFile, options)
        : principalImageFile
    );
    formData.append(
      "images",
      otherImagesFile[0]
        ? await imageCompression(otherImagesFile[0], options)
        : otherImagesFile[0]
    );
    formData.append(
      "images",
      otherImagesFile[1]
        ? await imageCompression(otherImagesFile[1], options)
        : otherImagesFile[1]
    );
    if (!principalImageFile) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please upload the principal image",
      });
      return;
    }
    try {
      //TODO: Test it
      dispatch(createPostStart());
      const response = await createPost(formData);
      dispatch(createPostSuccess(response.data));
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your post has been created successfully!",
      });
      navigate(`/account/${id}`);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "connectez vous d'abord",
      });
      console.log(err);

      dispatch(createPostFailure(err.message));
    } finally {
      setLoading(false);
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
      {loading && (
        <div className="loader">
          <span class="loader"></span>
        </div>
      )}
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div className="account-center">
          <div className="user-l">
            {isLoggedIn === "true" ? <SideCard /> : null}
            <Ads ad={1} />
          </div>
          <div className="add-content">
            <div className="add-post-l">
              <div className="add-big-image">
                <p>Choisissez votre photo principale</p>
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
              <p>Choisissez votre photo Secondaire</p>
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
              <p>Choisissez votre categories d'annonce</p>
              <Select
                options={categories.map((category) => ({
                  value: category._id,
                  label: category.name,
                }))}
                value={selectedCategory}
                onChange={handleCategoryChange}
                placeholder="Select a category"
                styles={customStyles}
                required
              />
              {selectedCategory && subcategories.length > 0 && (
                <div className="add-category">
                  <p>Choisissez votre sous-categories d’annonce</p>
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
              {selectedSubCategory && subcategories2.length > 0 && (
                <div className="add-category">
                  <p>: Choisissez votre sous-categories détaillée </p>
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
              {selectedSubCategory && subcategories3.length > 0 && (
                <div className="add-category">
                  <p>: Choisissez votre sous-categories détaillée </p>
                  <Select
                    options={subcategories3.map((subcategory) => ({
                      value: subcategory._id,
                      label: subcategory.name,
                    }))}
                    value={selectedSubCategory3}
                    onChange={handleSubcategory3Change}
                    placeholder="Select a subcategory"
                    styles={customStyles}
                  />
                </div>
              )}
              {selectedSubCategory && subcategories4.length > 0 && (
                <div className="add-category">
                  <p>: Choisissez votre sous-categories détaillée </p>
                  <Select
                    options={subcategories4.map((subcategory) => ({
                      value: subcategory._id,
                      label: subcategory.name,
                    }))}
                    value={selectedSubCategory4}
                    placeholder="Select a subcategory"
                    onChange={handleSubcategory4Change}
                    styles={customStyles}
                  />
                </div>
              )}
              <div className="add-category">
                <p>Définissez l’état de votre article</p>
                <Select
                  value={options_state.find((option) => option.value === etat)}
                  onChange={handleConditionChange}
                  options={options_state}
                  placeholder="select a state "
                  styles={customStyles}
                  required
                />
              </div>
            </div>
            <div className="add-title">
              <p>Titre de l’annonce</p>
              <input
                type="text"
                name="title"
                value={title}
                id=""
                placeholder="write title for your product"
                onChange={(e) => setTitle(e.target.value)}
                required
                minLength="6"
              />
            </div>
            <div className="add-description">
              <p>Description de l’annonce</p>
              <textarea
                name="description"
                id=""
                value={description}
                cols="30"
                rows="10"
                placeholder="write some lines to describe your product "
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="add-title">
              <p>Numéro de téléphone</p>
              <input
                type="tel"
                pattern="[0-9]{10}"
                name="phoneNumber"
                id=""
                value={phone}
                placeholder="Numéro de téléphone"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="add-price">
              <p>Prix</p>
              <input
                type="number"
                placeholder="00"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                id=""
                required
                min="1"
              />
            </div>
            <div className="add-price">
              <p>Wilaya</p>

              <Select
                value={wilaya.value}
                onChange={handleSelectwilayaChange}
                options={options}
                isMulti={false}
                placeholder="Select wilaya"
                styles={customStyles}
                required
              />
            </div>
            <button type="submit" className="btn-submit">
              Publier
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddPostForm;

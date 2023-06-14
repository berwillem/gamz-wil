import { useState, useEffect } from "react";
import AddPostForm from "../AddPostForm/AddPostForm";
import { fetchCategories, getCategories } from "../../Data/category";
const baseURL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

const AddPost = () => {
  // states::
  const [categories, setCategories] = useState([]);

  //functions:
  const fetchData = async () => {
    try {
      await fetchCategories();
      const fetchedCategories = getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await axios.get(baseURL+`/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch subcategories");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    <AddPostForm categories={categories} fetchSubcategories={fetchSubcategories} />

    </>
  );
};

export default AddPost;

{
  /* <p>Choose The Category for your post</p>
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
/> */
}
// const [categories, setCategories] = useState([]);
// const [selectedOptions, setSelectedOptions] = useState(null);
// const [subcats, setSubcats] = useState(null);
// const [subcatschildren, setSubcatschildren] = useState(null);
// const [selectedSubcatschildren, setSelectedSubcatschildren] =
//   useState(subcatschildren);
// const [selectedSubcats, setSelectedSubcats] = useState(subcats);

import { useState, useEffect } from "react";
import AddPostForm from "../AddPostForm/AddPostForm";
const baseURL = import.meta.env.VITE_BASE_URL;
import axios from "axios";
import { getCategories, getSubcategories } from "../../services/Category";

const AddPost = () => {
  // states::
  const [categories, setCategories] = useState([]);

  //functions:
  const fetchData = async () => {
    try {
      
      const fetchedCategories = await getCategories()
      setCategories(fetchedCategories.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSubcategories = async (categoryId) => {
    //TODO: Test it
    try {
      const response = await getSubcategories(categoryId)
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

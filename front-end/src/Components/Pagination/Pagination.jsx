import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import "./Pagination.css";
import image from "../../assets/no-result-diadem.png"
function Pagination({ posts,postsbycat}) {
  console.log("posts:::",posts);
  const [pages, setPages] = useState(0);
 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPages(Math.ceil(posts.length / 9));
  }, [posts]);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [currentPage]);

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    return posts.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(currentPage + 2, pages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };
  const filtrepost = getPaginatedData()
  .filter(
    (item) =>
      item.category._id === postsbycat || item.subcategories[0] === postsbycat
  );
 
  return (
    <div className="pagination-container">
      <div id="pagination-title">
        <p>Hot Products Today</p>
      </div>

      {pages === 0 && <p>Loading...</p>}

      {pages > 0 && (
        <>
          <div className="dataContainer">
          {!postsbycat ? (
  // Afficher toutes les catégories
  getPaginatedData().map((item, index) => (
  
    <Post
      key={index}
      category={item.category.name}
      img_post={item.images[0]}
      name={item.title}
      price={item.price}
      id={item._id}
    />
  ))
) : (
  // Afficher les posts de la catégorie spécifiée par l'ID
  getPaginatedData()
    .filter((item) => item.category._id === postsbycat || item.subcategories[0]===postsbycat
    )
    .map((item, index) => (
      <Post
        key={index}
        category={item.category.name}
        img_post={item.images[0]}
        name={item.title}
        price={item.price}
        id={item._id}
      />
    ))
)}

        
        {" "}
        {postsbycat && filtrepost.length === 0 && (
        <div>
          <img src={image} alt="Aucun résultat" />
        </div>
      )}
 
          </div>

          <div className="pagination">
            {getPaginationGroup().map((item, index) => (
              <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${
                  currentPage === item ? "active" : null
                }`}
              >
                <span>{item}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Pagination;

import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import "./Pagination.css";

function Pagination({ posts }) {
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

  return (
    <div className="pagination-container">
      <div id="pagination-title">
        <p>Les annonces récentes</p>
      </div>

      {pages === 0 && <p>Chargement…</p>}

      {pages > 0 && (
        <>
          <div className="dataContainer">
            {getPaginatedData().map((item, index) => (
              <Post
                key={index}
                category={item.category.name}
                img_post={item.images[0]}
                name={item.title}
                price={item.price}
                id={item._id}
              />
            ))}
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

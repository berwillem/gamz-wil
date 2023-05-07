import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import "./Pignation.css";

function Pagination({ posts }) {
  const [pages] = useState(Math.ceil(posts.length / 9));
  const [currentPage, setCurrentPage] = useState(1);

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
    let start = Math.floor((currentPage - 1) / 10) * 10;
    return new Array(pages).fill().map((_, idx) => idx + 1);
  };

  return (
    <div className="pagination-container">
      <div id="pagination-title">
        <p>Hot Products Today</p>
      </div>

      <div className="dataContainer">
        {getPaginatedData().map((i, index) => (
          <Post
            key={index}
            category={i.category.name}
            img_post={i.images[0]}
            name={i.title}
            price={i.price}
            id={i._id}
          />
        ))}
        
        {" "}
      </div>
      <div className="pagination">
        {/* <button onClick={goToPreviousPage}
                    className={
                        `prev ${
                            currentPage === 1 ? 'disabled' : ''
                        }`
                }>
                    prev
                </button> */}

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

        {/* <button onClick={goToNextPage}
                    className={
                        `next ${
                            currentPage === pages ? 'disabled' : ''
                        }`
                }>
                    next
                </button> */}
      </div>
    </div>
  );
}

export default Pagination;

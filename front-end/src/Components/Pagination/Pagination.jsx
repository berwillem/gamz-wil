import { useState, useEffect } from "react";
import Post from "../Post/Post";
import "./Pagination.css";
import image from "../../assets/no-result-diadem.webp";
function Pagination({ posts }) {
  //state
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // pagination function
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

  function changePage(event) {
    const action = event.target.dataset.action;
    let newPage = currentPage;

    if (action === "prev" && currentPage > 1) {
      newPage = currentPage - 1;
    } else if (action === "next" && currentPage < pages) {
      newPage = currentPage + 1;
    } else {
      const pageNumber = Number(event.target.textContent);
      newPage = pageNumber;
    }

    // Ensure the newPage is within valid bounds
    if (newPage >= 1 && newPage <= pages) {
      setCurrentPage(newPage);
    }
  }

  return (
    <div className="pagination-container">
      <div id="pagination-title">
        <p>Les annonces récentes</p>
      </div>

      {pages === 0 && <img src={image} alt="no post" />}

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
            <button
              onClick={changePage}
              data-action="prev"
              className="paginationItem"
            >
              &lt;
            </button>

            {getPaginationGroup().map((item, index) => (
              <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${
                  currentPage === item ? "active" : ""
                }`}
              >
                <span>{item}</span>
              </button>
            ))}

            <button
              onClick={changePage}
              data-action="next"
              className="paginationItem"
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Pagination;

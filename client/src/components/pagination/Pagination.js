import React from "react";
import './Pagination.css'

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  // console.log(currentPage)
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="Pagination">
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return (
            <li className="page-item" key={number}>
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;

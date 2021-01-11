import React from "react";
import _ from "lodash";
import propTypes from "prop-types";

const pagination = (props) => {
  const { itemCount, pageSize, currentPage, onPageChange } = props;

  const pagesCount = Math.ceil(itemCount / pageSize);
  if (pagesCount === 1) {
    return null;
  }
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {/* <li className="page-item">
        <a className="page-link" href="#">
          Previous
        </a>
      </li> */}
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}

        {/* <li className="page-item">
        <a className="page-link" href="#">
          Next
        </a>
      </li> */}
      </ul>
    </nav>
  );
};

pagination.propTypes = {
  itemCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
};

export default pagination;

import React from 'react';

const Pagination = ({ page, setPage, totalPages }) => {
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pages.map((pageNum) => (
          <li key={pageNum} className={`page-item ${pageNum === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => setPage(pageNum)}>
              {pageNum}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

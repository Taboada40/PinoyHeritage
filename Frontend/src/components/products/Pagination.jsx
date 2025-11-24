import React from 'react';
import '../../styles/products/Pagination.css';

function Pagination(props) {
  var currentPage = props.currentPage;
  var totalPages = props.totalPages;
  var onPageChange = props.onPageChange;

  function renderPageNumbers() {
    var pages = [];

    // Always show current page
    pages.push(
      <button
        key={currentPage}
        className="page-btn active"
        onClick={function() { onPageChange(currentPage); }}
      >
        {currentPage}
      </button>
    );

    // Show ellipsis and last page if not already last page
    if (currentPage < totalPages) {
      if (currentPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis" className="ellipsis">...</span>
        );
      }

      pages.push(
        <button
          key={totalPages}
          className={currentPage === totalPages ? 'page-btn active' : 'page-btn'}
          onClick={function() { onPageChange(totalPages); }}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  }

  return (
    <div className="pagination">
      <button
        className="page-nav-btn"
        onClick={function() { onPageChange(currentPage - 1); }}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {renderPageNumbers()}

      <button
        className="page-nav-btn"
        onClick={function() { onPageChange(currentPage + 1); }}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  );
}

export default Pagination;

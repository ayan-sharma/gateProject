import React from 'react';
import './pagination.css'


const Pagination = ({ pageCount, currentPage, handlePageChange }) => {
  const maxVisiblePages = 3; // Maximum number of visible page buttons
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
  let startPage;
  let endPage;




  if (pageCount <= maxVisiblePages) {
    startPage = 1;
    endPage = pageCount;
  } else {
    if (currentPage <= halfMaxVisiblePages) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage >= pageCount - halfMaxVisiblePages) {
      startPage = pageCount - maxVisiblePages + 1;
      endPage = pageCount;
    } else {
      startPage = currentPage - halfMaxVisiblePages;
      endPage = currentPage + halfMaxVisiblePages;
    }
  }

  const pageNumbers = Array.from({ length: endPage - startPage +1 }, (_, i) => startPage + i);

  return (
    <div className='pagination'>
      <button style={{background:"transparent",border:"1px solid",borderRadius:"6px"}}>
      <i
        className={`fa fa-chevron-left ${currentPage === 1 ? 'disabled-arow' : ''}`}
        style={{ border: '5px solid #ffffff00' ,cursor:"pointer"}}
        onClick={currentPage === 1 ? null : () => handlePageChange(currentPage - 1)}
      /> </button>
      <span>Prev</span>

      {startPage > 1 && (
        <>
          <button
            className={`page-link ${currentPage === 1 ? 'active-page' : 'disabled'}`}
            key={1}
            value={1}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            01
          </button>
          {startPage > 2 && <span className="ellipsis">..</span>}
        </>
      )}

      {pageNumbers.map((pageNumber) => ( // Use 'pageNumber' instead of 'page'
        <button
          className={`page-link ${pageNumber === currentPage ? 'active-page' : 'disabled'}`} // Use 'pageNumber' instead of 'page'
          key={pageNumber} // Use 'pageNumber' instead of 'page'
          value={pageNumber} // Use 'pageNumber' instead of 'page'
          onClick={() => handlePageChange(pageNumber)} // Use 'pageNumber' instead of 'page'
          disabled={pageNumber === currentPage} // Use 'pageNumber' instead of 'page'
        >
          
          {pageNumber < 10 ? `0${pageNumber}`:`${pageNumber}`} {/* Use 'pageNumber' instead of 'page' */}
        </button>
      ))}

      {endPage < pageCount && (
        <>
          {endPage < pageCount - 1 && <span className="ellipsis">..</span>}
          <button
            className={`page-link ${currentPage === pageCount ? 'active-page' : 'disabled'}`}
            key={pageCount}
            value={pageCount}
            onClick={() => handlePageChange(pageCount)}
            disabled={currentPage === pageCount}
          >
            {pageCount}
          </button>
        </>
      )}
Next
      <i
        className={`fa fa-chevron-right ${currentPage === pageCount ? 'disabled-arow' : ''}`}
        style={{ border: '5px solid #ffffff00' }}
        onClick={currentPage === pageCount ? null : () => handlePageChange(currentPage + 1)}
      ></i>
    </div>
  );
};

export default Pagination;

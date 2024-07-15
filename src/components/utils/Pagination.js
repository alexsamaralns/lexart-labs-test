import React from 'react'

const NUMBER_PAGES = 5
const NUMBER_MIN_INITIAL_PAGES = 3
const NUMBER_MIN_FINAL_PAGES = 2

const Pagination = ({ itemsPerPage, totalItems, totalPages, currentPage, paginate }) => {
  const pageNumbers = []

  if (totalPages > NUMBER_PAGES) {
    if (currentPage <= NUMBER_MIN_INITIAL_PAGES) {
      for (let i = 1; i <= NUMBER_PAGES; i++) {
        pageNumbers.push(i)
      }
    } else if (currentPage >= totalPages - NUMBER_MIN_FINAL_PAGES) {
      for (let i = totalPages - NUMBER_PAGES + 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i)
      }
    } else {
      for (
        let i = currentPage - NUMBER_MIN_FINAL_PAGES;
        i <= currentPage + NUMBER_MIN_FINAL_PAGES;
        i++
      ) {
        pageNumbers.push(i)
      }
    }
  } else {
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i)
    }
  }

  return (
    <nav className="pagination-nav">
      <ul>
        <li className="page-item-button">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={number === currentPage ? 'page-item-number-active' : 'page-item-number'}
          >
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
        <li className="page-item-button">
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination

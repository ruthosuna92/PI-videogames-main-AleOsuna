import './Paginacion.css';

const Paginacion = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  console.log(pageNumbers);

  return (
    <div className="pagination-container">
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`neon-button ${currentPage === number ? 'active' : ''}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Paginacion;

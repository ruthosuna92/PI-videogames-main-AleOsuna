import './Paginacion.css';

const Paginacion = ({ currentPage, totalPages, onPageChange }) => {
  
  const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
  const pageNumbers = range(1, totalPages, 1)



  console.log(totalPages);

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

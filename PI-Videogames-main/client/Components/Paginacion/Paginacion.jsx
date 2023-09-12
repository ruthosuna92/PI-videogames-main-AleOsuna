import './Paginacion.css';

const Paginacion = ({ currentPage, totalPages, onPageChange }) => {

  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
  const pageNumbers = range(1, totalPages, 1)
  console.log(pageNumbers.slice(4))

  let buttonsPerRender = 3
  let startIndex = currentPage - 1
  let endIndex = startIndex + buttonsPerRender

  const botones = (pageNumbers) => {

    let botonesNum = null

    if (currentPage >= pageNumbers.length - 2) {
      botonesNum = pageNumbers.slice(pageNumbers.length - 3)
      return botonesNum
    } else {
      botonesNum = pageNumbers.slice(startIndex, endIndex);
      return botonesNum
    }

  }
  const handlePage = (e) => {
    if (e.target.name === 'button') {
      onPageChange(Number(e.target.id))
    }
    if (e.target.name === 'prev') {
      let anterior = currentPage - 1
      onPageChange(anterior)
    }
    if (e.target.name === 'next') {
      let siguiente = currentPage + 1
      onPageChange(siguiente)
    }
    if (e.target.name === 'first') {
      onPageChange(1)
    }
    if (e.target.name === 'last') {
      onPageChange(pageNumbers[pageNumbers.length - 1])
    }
  }
  return (
    <div className="pagination-container">
      <div className='all-buttons'>
      {currentPage > 3 && <button name='first' onClick={handlePage} className='neon-button'>First</button>}
      {currentPage > 1 && <button name='prev' onClick={handlePage} className='neon-button'>Prev</button>}
      <div className='buttons-container'>
        {botones(pageNumbers).map((number, i) => (
          <button
            key={number}
            className={`neon-button number-button ${currentPage === number ? 'active' : ''}`}
            onClick={handlePage}
            index={i}
            name={`button`}
            id={number}
          >
            {number}
          </button>
        ))}

      </div>
      {currentPage < pageNumbers.length - 2 && <button name='next' onClick={handlePage} className='neon-button'>Next</button>}
      {currentPage < pageNumbers.length - 2 && <button name='last' onClick={handlePage} className='neon-button'>Last</button>}
      </div>
      {pageNumbers.length> 1 &&<p className='texto'> Página {currentPage} de {totalPages} </p>}
    </div>
  );
};

export default Paginacion;

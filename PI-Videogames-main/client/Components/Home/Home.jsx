import Cards from "../Cards/Cards"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import './Home.css'
import { getAllGames, getByName } from "../../Redux/actions"
import Paginacion from '../Paginacion/Paginacion';



const Home = () => {
    const allVideogames = useSelector((state) => state.allVideogames) 
    const genres = useSelector((state) => state.allGenres)
    const name = useSelector((state) => state.nameSearched)
    const dispatch = useDispatch()
    const [filtros, setFiltros] = useState({ 
        rating: '',
        orden: '',
        generos: [],
        origen: '',
    })
    const [juegosFiltradosState, setJuegosFiltradosState] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [currentPage, setCurrentPage] = useState(1);
    const gamesPerPage = 15;

    const onPageChange = (pageNumber) => { 
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * gamesPerPage; 
    const endIndex = startIndex + gamesPerPage;
    console.log(name);
    useEffect(() => {
        
        if(name){
            setIsLoading(true)
            dispatch(getByName(name))
            .then(() => setIsLoading(false))
        } else {
            setIsLoading(true);
            dispatch(getAllGames())
            .then(() => {
                setIsLoading(false);
            })
        }
    }, [name]);
    
    useEffect(() => {
        let juegosFiltrados = [...allVideogames];

        
        if (filtros.orden === 'A') {
            
            juegosFiltrados = juegosFiltrados.sort((juegoA, juegoB) => juegoA.name.localeCompare(juegoB.name))
            setCurrentPage(1)
        }
        if (filtros.orden === 'D') {
            
            juegosFiltrados = juegosFiltrados.sort((juegoA, juegoB) => juegoB.name.localeCompare(juegoA.name));
            setCurrentPage(1)
        }
        if (filtros.origen === 'Api') {
            juegosFiltrados = juegosFiltrados.filter((videojuego) => typeof videojuego.id === 'number')
            setCurrentPage(1)
        }
        if (filtros.origen === 'Database') {
            juegosFiltrados = juegosFiltrados.filter((videojuego) => typeof videojuego.id !== 'number')
            setCurrentPage(1)
        }
        if (filtros.rating === 'Ar') {
           
            juegosFiltrados = juegosFiltrados.sort((a, b) => a.rating - b.rating)
            setCurrentPage(1)
        }
        if (filtros.rating === 'Dr') {
            
            juegosFiltrados = juegosFiltrados.sort((a, b) => b.rating - a.rating)
            setCurrentPage(1)
        }
        if (filtros.generos.length) {
            
            let juegosFiltradosPorGenero = []
            
            for (let j = 0; j < juegosFiltrados.length; j++) {
                let generosDelJuego = juegosFiltrados[j].genres.map((a) => a.name)
                const coincide = filtros.generos.every(gen => generosDelJuego.includes(gen));
                if (coincide && !juegosFiltradosPorGenero.includes(juegosFiltrados[j])) {
                    juegosFiltradosPorGenero.push(juegosFiltrados[j])
                }
            }
            juegosFiltrados = juegosFiltradosPorGenero
            setCurrentPage(1)
        }
        
        setJuegosFiltradosState(juegosFiltrados);
    }, [filtros, allVideogames])

    const handleChange = (e) => {
        if(e.target.name === 'rating'){
            setFiltros({
                ...filtros,
                rating: e.target.value
            })
        }
        if(e.target.name === 'orden'){
            setFiltros({
                ...filtros,
                orden: e.target.value
            })
        }
        if (e.target.name === 'generos') {
            setFiltros({
                ...filtros,
                generos: [...filtros.generos, e.target.value]
            });
        } else {
            setFiltros({
                ...filtros,
                [e.target.name]: e.target.value
            });
        }
    }
    const handleGeneros = (e) => {
        setFiltros({
            ...filtros,
            generos: filtros.generos.filter((gen) => gen !== e.target.name)
        })
    }
    const handleFiltros = (e) => {
        if (e.target.name === 'generos') {
            setFiltros({
                ...filtros,
                generos: []
            })
        }
        setFiltros({
            ...filtros,
            [e.target.name]: ''
        })
    }
    const comprobando = filtros.generos.length !== 0 || filtros.orden !== '' || filtros.origen !== '' || filtros.rating !== ''
   
    const juegosPorPagina = juegosFiltradosState.slice(startIndex, endIndex);
    return (
        <div className="home-container">

            {isLoading && (
                <div className="loading-container">
                    <div className="neon-loading">
                        <div className="neon-circle"></div>
                        Loading
                    </div>
                </div>
            )}
            <div className="filters-container">
                <p>Ordenar alfabéticamente</p>
                <select name="orden" value={filtros.orden} onChange={handleChange}>
                    <option value="">Seleccionar orden</option>
                    <option value="A">Ascendente</option>
                    <option value="D">Descendente</option>

                </select>
                <button onClick={handleFiltros} name='orden' className={`filtros-neon-button ${filtros.orden !== '' ? 'active' : ''}`}>Resetear orden</button>
                <p>Ordenar por rating</p>
                <select name="rating" value={filtros.rating} onChange={handleChange}>
                    <option value="">Seleccionar rating</option>
                    <option value='Ar'>Ascendente</option>
                    <option value='Dr'>Descendente</option>
                </select>
                <button onClick={handleFiltros} name='rating' className={`filtros-neon-button ${filtros.rating !== '' ? 'active' : ''}`}>Resetear orden</button>
                <p>Filtrar por origen</p>
                <select name="origen" value={filtros.origen} onChange={handleChange}>

                    <option value="">Seleccionar origen</option>
                    <option value='Api'>Api</option>
                    <option value='Database'>Database</option>
                </select>
                <button onClick={handleFiltros} name='origen' className={`filtros-neon-button ${filtros.origen !== '' ? 'active' : ''}`}>Resetear origen</button>
                <p>Filtrar por género</p>
                <select name="generos" onChange={handleChange}>
                    <option value="">Seleccionar género</option>
                    {genres && genres.map((gen)=>{
                        
                        return <option value={gen.name}>{gen.name}</option>
                    })}
                </select>

                <div className="selected-genres-container">
                    {filtros.generos &&
                        filtros.generos.map((gen) => (
                            <div key={gen} className="selected-genre">
                                <button name={gen} onClick={handleGeneros} className="remove-genre">
                                    x
                                </button>
                                {gen}
                            </div>
                        ))}
                </div>
                        <button onClick={handleFiltros} name='generos' className={`filtros-neon-button ${filtros.generos.length !== 0 ? 'active' : ''}`}>Resetear géneros</button>

            </div>
            <Paginacion
                currentPage={currentPage}
                totalPages={Math.ceil(juegosFiltradosState.length / gamesPerPage)}
                onPageChange={onPageChange}
            />
    {juegosFiltradosState.length === 0 && comprobando &&(
      <div className="error-container">
        <h1 className="error-message">JUEGO NO ENCONTRADO!!</h1>
        <img className="error-mario" src="https://www.egames.news/__export/1600098643488/sites/debate/img/2020/09/14/mario-head-removebg-preview_crop1600098532376.png_242310155.png" alt="mario" />
      </div>
    )}
            {allVideogames.length === 0 && !isLoading && (
  <div className="error-container">
    <h1 className="error-message">JUEGO NO ENCONTRADO!!</h1>
    <img className="error-mario" src="https://www.egames.news/__export/1600098643488/sites/debate/img/2020/09/14/mario-head-removebg-preview_crop1600098532376.png_242310155.png" alt="mario" />
  </div>
)}
            <div className="cards-container">
                {!isLoading ? (
                    <Cards juegosFiltradosState={juegosPorPagina} />
                ) : null}
            </div>
        </div>
    )
}

export default Home
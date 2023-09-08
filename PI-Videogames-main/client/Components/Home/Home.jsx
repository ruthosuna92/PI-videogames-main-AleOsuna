import Cards from "../Cards/Cards"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import './Home.css'
import { getAllGames } from "../../Redux/actions"
import Paginacion from '../Paginacion/Paginacion';



const Home = () => {
    const allVideogames = useSelector((state) => state.allVideogames) // me traigo los videojuegos que guardé en el estado global
    const dispatch = useDispatch()
    const [filtros, setFiltros] = useState({ // estado local para los filtros
        orden: '',
        generos: [],
        origen: ''
    })
    const [juegosFiltradosState, setJuegosFiltradosState] = useState([]); // estado para guardar dinámicamente los juegos que se van filtrando con los diferentes select
    const [isLoading, setIsLoading] = useState(true); // estado local para cuando todavía no hay cards
    const [currentPage, setCurrentPage] = useState(1); // estado local para calcular el paginado
    const gamesPerPage = 15;// cantidad de juegos que se muestran por página

    const onPageChange = (pageNumber) => { // función que actualiza el número de página que se esta mostrando
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * gamesPerPage; //cálculo para el índice de la primera posición en el array de videojuegos, para luego utilizarlo en un slice
    const endIndex = startIndex + gamesPerPage; //cálculo del segundo índice que se le pasa por parámetro al slice, ya que corta una posición antes

    useEffect(() => {
        setIsLoading(true);
        dispatch(getAllGames())
            .then(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {

        let juegosFiltrados = [...allVideogames];

        if (filtros.orden === 'A') {
            juegosFiltrados.sort((juegoA, juegoB) => juegoA.name.localeCompare(juegoB.name))

        }
        if (filtros.orden === 'D') {
            juegosFiltrados.sort((juegoA, juegoB) => juegoB.name.localeCompare(juegoA.name));
        }
        if (filtros.origen === 'Api') {
            juegosFiltrados = juegosFiltrados.filter((videojuego) => typeof videojuego.id === 'number')
        }
        if (filtros.origen === 'Database') {
            juegosFiltrados = juegosFiltrados.filter((videojuego) => typeof videojuego.id !== 'number')
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

            console.log(juegosFiltradosPorGenero);
            juegosFiltrados = juegosFiltradosPorGenero

        }

        setJuegosFiltradosState(juegosFiltrados);
    }, [filtros, allVideogames])


    const handleChange = (e) => {
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
        e.preventDefault()
        console.log(e.target.name);
        setFiltros({
            ...filtros,
            generos: filtros.generos.filter((gen) => gen !== e.target.name)
        })
    }
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
                <p>Filtrar por origen</p>
                <select name="origen" value={filtros.origen} onChange={handleChange}>

                    <option value="">Seleccionar origen</option>
                    <option value='Api'>Api</option>
                    <option value='Database'>Database</option>
                </select>
                <p>Filtrar por género</p>
                <select name="generos" onChange={handleChange}>

                    <option value="">Seleccionar género</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Indie">Indie</option>
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Casual">Casual</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                    <option value="Racing">Racing</option>
                    <option value="Sports">Sports</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Family">Family</option>
                    <option value="Board Games">Board Games</option>
                    <option value="Educational">Educational</option>
                    <option value="Card">Card</option>
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

            </div>
            <Paginacion
                currentPage={currentPage}
                totalPages={Math.ceil(juegosFiltradosState.length / gamesPerPage)}
                onPageChange={onPageChange}
            />
            <button>Filtrar</button>
            <div className="cards-container">
                {!isLoading ? (
                    <Cards juegosFiltradosState={juegosPorPagina} />
                ) : null}
            </div>
        </div>
    )
}

export default Home
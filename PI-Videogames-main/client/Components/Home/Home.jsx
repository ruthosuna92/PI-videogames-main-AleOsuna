import Cards from "../Cards/Cards"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getAllGames } from "../../Redux/actions"



const Home = () => {
    const allVideogames = useSelector((state) => state.allVideogames)
    const dispatch = useDispatch()
    const [filtros, setFiltros] = useState({
        orden: '',
        generos: [],
        origen: ''
    })
    const [juegosFiltradosState, setJuegosFiltradosState] = useState([]);

    useEffect(() => {
        dispatch(getAllGames())
    }, [])

    useEffect(() => {

        let juegosFiltrados = [...allVideogames];

        if (filtros.orden === 'A') {
            juegosFiltrados.sort((juegoA, juegoB) => juegoA.name.localeCompare(juegoB.name));
        }
        if(filtros.orden === 'D'){
            juegosFiltrados.sort((juegoA, juegoB) => juegoB.name.localeCompare(juegoA.name));
        }
        if(filtros.origen === 'Api'){
            juegosFiltrados = juegosFiltrados.filter((videojuego) => typeof videojuego.id === 'number')
        }
        if(filtros.origen === 'Database'){
            juegosFiltrados = juegosFiltrados.filter((videojuego) => typeof videojuego.id !== 'number')
        }
        if(filtros.generos.length){
            console.log('adentro del if de generos');
            let juegosFiltradosPorGenero = []
            for(let i = 0; i < filtros.generos.length; i++){
                let generoSeleccionado = filtros.generos[i]
                console.log(generoSeleccionado);
                for(let j = 0; j < juegosFiltrados.length; j++){
                    let generosDelJuego = juegosFiltrados[j].genres
                    console.log(generosDelJuego);
                    for(let k = 0; k < generosDelJuego.length; k++){
                        let generoDelJuego = generosDelJuego[k].name
                        if(generoDelJuego === generoSeleccionado){
                            juegosFiltradosPorGenero.push(juegosFiltrados[j])
                        }
                    }
                }
            }
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


    console.log(filtros.origen);
    console.log(filtros.generos);
    
    return (
        <div>
            <p>Soy el Home!!</p>
            <select name="orden" value={filtros.orden} onChange={handleChange}>
                <option value="">Seleccionar orden</option>
                <option value="A">Ascendente</option>
                <option value="D">Descendente</option>
            </select>
            <select name="origen" value={filtros.origen} onChange={handleChange}>
            <option value="">Seleccionar orden</option>
                <option value='Api'>Api</option>
                <option value='Database'>Database</option>
            </select>
            <select name="generos" onChange={handleChange}>
            <option value="">Seleccionar orden</option>
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
            <Cards juegosFiltradosState={juegosFiltradosState} />

        </div>
    )
}

export default Home


            // const videogames = [{
            //     id: 908462,
            //     name: "MAURICE",
            //     background_image: "https://media.rawg.io/media/screenshots/ee5/ee51a13c66a951d8d19ab49ad3809b63.jpg",
            //     genres: []
            // },
            // {
            //     id: 412447,
            //     name: "Reach (Mauricio Castillo)",
            //     background_image: "https://media.rawg.io/media/screenshots/843/843cdcedebe333b86cea258afe188cea.jpg",
            //     genres: []
            // },
            // {
            //     id: 722296,
            //     name: "Detetive (Mauriiicio)",
            //     background_image: "https://media.rawg.io/media/screenshots/bbb/bbbe68b00957e60bb2ca26aea5aceea8.jpg",
            //     genres: [
            //         {
            //             name: "Adventure"
            //         }
            //     ]
            // },
            // {
            //     id: 850501,
            //     name: "Team 13 - The Legend of Maurice",
            //     background_image: "https://media.rawg.io/media/screenshots/739/73988c574f64da0c171465c1b80b1f54.jpg",
            //     genres: []
            // }]
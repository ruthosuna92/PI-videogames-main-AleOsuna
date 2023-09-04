import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { postVideogame } from "../../Redux/actions"

const Form = () => {
    const dispatch = useDispatch()
    const [created, setCreated] = useState({
        name: "",
        background_image: "",
        genres: [],
        descrption: "",
        platforms: "",
        rating: "",
        released: "",
    })

    const handleChange = (e) => {
        if (e.target.name === "genres") {
            setCreated({
                ...created,
                genres: [...created.genres, e.target.value]
            })
        } else {
            setCreated({
                ...created,
                [e.target.name]: e.target.value
            })

        }
        console.log(created);

    }
    const handleGenres = (e) => {
        e.preventDefault()
        setCreated({
            ...created,
            genres: created.genres.filter((gen) => gen !== `"${e.target.name}"`)
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postVideogame(created))

    }
    return (
        <form onSubmit={handleSubmit}>
            <p>Crea tu propio videogame!!!</p>
            <br></br>
            <label>Nombre</label>
            <input type='text' placeholder="Ingresa un nombre..." onChange={handleChange} name="name" value={created.name}></input>
            <br></br>
            <label>Descripción</label>
            <textarea placeholder="Ingresa la descripción de tu videogame..." onChange={handleChange} name="description" value={created.description}></textarea>
            <br></br>
            <label>Plataforma</label>
            <input placeholder="ej: IOs, PC, Xbox..." onChange={handleChange} name="platforms" value={created.platforms}></input>
            <br></br>
            <label>Fecha de lanzamiento</label>
            <input placeholder="aaaa-mm-dd" onChange={handleChange} name="released" value={created.released}></input>
            <br></br>
            <label>Rating</label>
            <input placeholder="0.00 a 5.00" onChange={handleChange} name="rating" value={created.rating}></input>
            <br></br>
            <select name="genres" onChange={handleChange}>
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
            {created.genres.length && created.genres.map((gen) => <span> {gen} <button name={gen} onClick={handleGenres}>x</button></span>)}
            <br></br>
            <label>Imagen</label>
            <input placeholder="Ingresa el url de la imagen de tu videogame" onChange={handleChange} name="background_image" value={created.background_image}></input>
            <br></br>
            <button>Crear</button>
        </form>
    )
}

export default Form
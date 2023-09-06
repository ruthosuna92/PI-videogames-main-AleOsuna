import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { postVideogame } from "../../Redux/actions"
import { validations } from "../../validations"

const Form = () => {
    const postResponse = useSelector((state) => state.postResponse)
    const dispatch = useDispatch()

    const [errors, setErrors] = useState({

        // name: "",
        // background_image: "",
        // genres: [],
        // description: "",
        // platforms: "",
        // rating: "",
        // released: ""
    })
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
            if (created.genres.includes(e.target.value)) {
                console.log('adentro del if');
                window.alert('Ya seleccionaste este género, selecciona otro')
                return setCreated({
                    ...created,
                    genres: [...new Set(created.genres)]
                })

            };
            setCreated({
                ...created,
                genres: [...created.genres, e.target.value]
            })
            setErrors(
                validations({
                    ...created,
                    genres: [...created.genres, e.target.value]
                })
            )

        } else {
            setCreated({
                ...created,
                [e.target.name]: e.target.value
            })
            setErrors(
                validations({
                    ...created,
                    [e.target.name]: e.target.value
                })
            )
            console.log(created);

        }

    }
    const handleGenres = (e) => {
        e.preventDefault()
        setCreated({
            ...created,
            genres: created.genres.filter((gen) => gen !== e.target.name)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.entries(errors).length === 0) {
            console.log('adentro del if');
            dispatch(postVideogame(created))
            window.alert(`${postResponse}`)
        } else {
            window.alert('Falta información para crear tu videogame!!')
        }

    }
    console.log(errors);
    console.log(created);
    console.log(postResponse);
    return (
        <form onSubmit={handleSubmit}>
            <p>Crea tu propio videogame!!!</p>
            <br></br>
            <label>Nombre</label>
            <input type='text' placeholder="Ingresa un nombre..." onChange={handleChange} name="name" value={created.name}></input>
            {errors.eName && <p>{errors.eName}</p>}
            <br></br>
            <label>Descripción</label>
            <textarea placeholder="Ingresa la descripción de tu videogame..." onChange={handleChange} name="description" value={created.description}></textarea>
            {errors.eDescription && <p>{errors.eDescription}</p>}
            <br></br>
            <label>Plataforma</label>
            <input placeholder="ej: IOs, PC, Xbox..." onChange={handleChange} name="platforms" value={created.platforms}></input>
            {errors.ePlatforms && <p>{errors.ePlatforms}</p>}
            <br></br>
            <label>Fecha de lanzamiento</label>
            <input placeholder="aaaa-mm-dd" onChange={handleChange} name="released" value={created.released}></input>
            {errors.eReleased && <p>{errors.eReleased}</p>}
            <br></br>
            <label>Rating</label>
            <input placeholder="0.00 a 5.00" onChange={handleChange} name="rating" value={created.rating}></input>
            {errors.eRating1 && <p>{errors.eRating1}</p>}
            {errors.eRating2 && <p>{errors.eRating2}</p>}
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
            {created.genres && created.genres.map((gen) => <span> {gen} <button name={gen} onClick={handleGenres}>x</button></span>)}
            {errors.eGenres1 && <p>{errors.eGenres1}</p>}
            <br></br>
            <label>Imagen</label>
            <input placeholder="Ingresa el url de la imagen de tu videogame" onChange={handleChange} name="background_image" value={created.background_image}></input>
            {errors.eImage && <p>{errors.eImage}</p>}
            <br></br>
            <button value='valor'>Crear</button>
        </form>
    )
}

export default Form
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postVideogame } from "../../Redux/actions";
import { validations } from "../../validations";
import "./Form.css";

const Form = () => {
  const postResponse = useSelector((state) => state.postResponse);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [created, setCreated] = useState({
    name: "",
    background_image: "",
    genres: [],
    description: "",
    platforms: "",
    rating: "",
    released: "",
    }); 
    const [focusedInput, setFocusedInput] = useState(''); // Estado para rastrear el input enfocado
    const [onBlurInput, setOnBlurInput] = useState('')
    console.log(focusedInput);
  const handleChange = (e) => {
    if (e.target.name === "genres") {
      if (created.genres.includes(e.target.value)) {
        window.alert("Ya seleccionaste este género, selecciona otro");
        return setCreated({
          ...created,
          genres: [...new Set(created.genres)],
        });
      }
      setCreated({
        ...created,
        genres: [...created.genres, e.target.value],
      });
      setErrors(
        validations({
          ...created,
          genres: [...created.genres, e.target.value],
        })
      );
    } else {
      setCreated({
        ...created,
        [e.target.name]: e.target.value,
      });
      setErrors(
        validations({
          ...created,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const handleGenres = (e) => {
    e.preventDefault();
    setCreated({
      ...created,
      genres: created.genres.filter((gen) => gen !== e.target.name),
    });
    console.log(e.target.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.entries(errors).length === 0) {
      dispatch(postVideogame(created));
    } else {
      window.alert("Falta información para crear tu videojuego!!");
    }
  };
  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  }
  const handleOnBlur = (inName) =>{
    setOnBlurInput(inName)

  }
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <p>Crea tu propio videojuego!!!</p>
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Ingresa un nombre..."
          onChange={handleChange}
          name="name"
          value={created.name}
          onFocus={() => handleInputFocus("name")}
          onBlur={() => handleOnBlur("name")}
          className={focusedInput === "name" ? "neon-input" : ""}
        />
        {onBlurInput === 'name' &&errors.eName && <p className="error-text">{errors.eName}</p>}
        <label>Descripción</label>
        <textarea
          placeholder="Ingresa la descripción de tu videojuego..."
          onChange={handleChange}
          name="description"
          value={created.description}
          onFocus={() => handleInputFocus("description")}
          onBlur={() => handleOnBlur("description")}
          className={focusedInput === "description" ? "neon-input" : ""}
        ></textarea>
        {onBlurInput === 'description' && errors.eDescription && (
          <p className="error-text">{errors.eDescription}</p>
        )}
        <label>Plataforma</label>
        <input
          placeholder="ej: IOs, PC, Xbox..."
          onChange={handleChange}
          name="platforms"
          value={created.platforms}
          onFocus={() => handleInputFocus("platforms")}
          onBlur={() => handleOnBlur("platforms")}
          className={focusedInput === "platforms" ? "neon-input" : ""}
        />
        {onBlurInput === 'platforms' && errors.ePlatforms && <p className="error-text">{errors.ePlatforms}</p>}
        <label>Fecha de lanzamiento</label>
        <input
          placeholder="aaaa-mm-dd"
          onChange={handleChange}
          name="released"
          value={created.released}
          onFocus={() => handleInputFocus("released")}
          onBlur={() => handleOnBlur("released")}
          className={focusedInput === "released" ? "neon-input" : ""}
        />
        {onBlurInput === 'released' && errors.eReleased && <span className="error-text">{errors.eReleased}</span>}
        <label>Rating</label>
        <input
          placeholder="0.00 a 5.00"
          onChange={handleChange}
          name="rating"
          value={created.rating}
          onFocus={() => handleInputFocus("rating")}
          onBlur={() => handleOnBlur("rating")}
          className={focusedInput === "rating" ? "neon-input" : ""}
        />
        {onBlurInput === 'rating' && errors.eRating1 && <p className="error-text">{errors.eRating1}</p>}
        {onBlurInput === 'rating' && errors.eRating2 && <p className="error-text">{errors.eRating2}</p>}
        <select name="genres" onChange={handleChange}
        onFocus={() => handleInputFocus("genres")}
        onBlur={() => handleOnBlur("genres")}>
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
        <div className="container-genres">
        {onBlurInput === 'genres' && created.genres &&
          created.genres.map((gen) => (
            <span key={gen} className="generos">{gen}<button name={gen} onClick={handleGenres} className="eliminar-button"><img
                    src="https://freepngimg.com/thumb/alphabets/22-2-x-alphabet-png.png" 
                    alt="Eliminar"
                    className="eliminar-icon"
                    name={gen}
                /></button>
            </span>
          ))}
        </div>
        {onBlurInput === 'genres' && errors.eGenres1 && <p className="error-text">{errors.eGenres1}</p>}
        <label>Imagen</label>
        <input
          placeholder="Ingresa el URL de la imagen de tu videojuego"
          onChange={handleChange}
          name="background_image"
          value={created.background_image}
          onFocus={() => handleInputFocus("background_image")}
          onBlur={() => handleOnBlur("background_image")}
          className={focusedInput === "background_image" ? "neon-input" : ""}
        />
        {onBlurInput === 'background_image' && errors.eImage && <p className="error-text">{errors.eImage}</p>}
        <button type="submit" value="valor">
          Crear
        </button>
        {postResponse && <p className="success-text">{postResponse}</p>}
      </form>
    </div>
  );
};

export default Form;

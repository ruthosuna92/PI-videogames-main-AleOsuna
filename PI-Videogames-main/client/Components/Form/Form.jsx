import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postVideogame, clean } from "../../Redux/actions";
import { validations } from "../../validations";
import "./Form.css";

const Form = () => {
  const postResponse = useSelector((state) => state.postResponse);
  const errorResponse = useSelector((state) => state.errorResponse)
  const dispatch = useDispatch();
  console.log(postResponse);
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
  const [focusedInput, setFocusedInput] = useState({
    name: false,
    background_image: false,
    genres: false,
    description: false,
    platforms: false,
    rating: false,
    released: false,
  }); // Estado para rastrear el input enfocado
  const [onBlurInput, setOnBlurInput] = useState({
    name: false,
    background_image: false,
    genres: false,
    description: false,
    platforms: false,
    rating: false,
    released: false,
  })
  const [creating, setCreating] = useState(false)
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

      dispatch(postVideogame(created))
    } else {
      setCreating(true);
    }
  };
  const handleInputFocus = (e) => {
    setFocusedInput({
      ...focusedInput,
      [e.target.name]: true
    });

  }
  const handleOnBlur = (e) => {
    setOnBlurInput({
      ...onBlurInput,
      [e.target.name]: true
    });
  }
  const handleWindow = (e) => {
    e.preventDefault();
    dispatch(clean())
    setCreated({
      name: "",
      background_image: "",
      genres: [],
      description: "",
      platforms: "",
      rating: "",
      released: "",
    })
    setCreating(false)
  }
  return (
    <div className="form-container">

      {creating && <div className="ventana"><img className="error" src='https://images.emojiterra.com/google/noto-emoji/unicode-15/animated/274c.gif' />
        <p>Falta información</p>
        <button className="neon-button" onClick={handleWindow}>Aceptar</button></div>}

      {errorResponse !== '' && <div className="ventana"><img className="error" src='https://images.emojiterra.com/google/noto-emoji/unicode-15/animated/274c.gif' />
        <p>{errorResponse}</p>
        <button className="neon-button" onClick={handleWindow}>Aceptar</button></div>}

      {postResponse !== '' && <div className="ventana"><img className="check" src='https://adrenalead.com/wp-content/uploads/2023/02/31-check-solid-2.gif' />
        <p>{postResponse}</p>
        <button className="neon-button" onClick={handleWindow}>Aceptar</button></div>}
        
      <form onSubmit={handleSubmit}>
        <p>Crea tu propio videojuego!!!</p>
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Ingresa un nombre..."
          onChange={handleChange}
          name="name"
          value={created.name}
          onFocus={handleInputFocus}
          onBlur={handleOnBlur}
          className={focusedInput.name ? "neon-input" : ""}
        />
        {onBlurInput.name && focusedInput.name && errors.eName && <p className="error-text">{errors.eName}</p>}
        {onBlurInput.name && focusedInput.name && errors.eName2 && <p className="error-text">{errors.eName2}</p>}
        <label>Descripción</label>
        <textarea
          placeholder="Ingresa la descripción de tu videojuego..."
          onChange={handleChange}
          name="description"
          value={created.description}
          onFocus={handleInputFocus}
          onBlur={handleOnBlur}
          className={focusedInput.description ? "neon-input" : ""}
        ></textarea>
        {onBlurInput.description && focusedInput.description && errors.eDescription && (
          <p className="error-text">{errors.eDescription}</p>
        )}
        {onBlurInput.description && focusedInput.description && errors.eDescription2 && (
          <p className="error-text">{errors.eDescription2}</p>
        )}
        <label>Plataforma</label>
        <input
          placeholder="ej: IOs, PC, Xbox..."
          onChange={handleChange}
          name="platforms"
          value={created.platforms}
          onFocus={handleInputFocus}
          onBlur={handleOnBlur}
          className={focusedInput.platforms ? "neon-input" : ""}
        />
        {onBlurInput.platforms && focusedInput.platforms && errors.ePlatforms && <p className="error-text">{errors.ePlatforms}</p>}
        <label>Fecha de lanzamiento</label>
        <input
          placeholder="aaaa-mm-dd"
          onChange={handleChange}
          name="released"
          value={created.released}
          onFocus={handleInputFocus}
          onBlur={handleOnBlur}
          className={focusedInput.released ? "neon-input" : ""}
        />
        {onBlurInput.released && focusedInput.released && errors.eReleased && <span className="error-text">{errors.eReleased}</span>}
        <label>Rating</label>
        <input
          placeholder="0.00 a 5.00"
          onChange={handleChange}
          name="rating"
          value={created.rating}
          onFocus={handleInputFocus}
          onBlur={handleOnBlur}
          className={focusedInput.rating ? "neon-input" : ""}
        />
        {onBlurInput.rating && focusedInput.rating && errors.eRating1 && <p className="error-text">{errors.eRating1}</p>}
        {onBlurInput.rating && focusedInput.rating && errors.eRating2 && <p className="error-text">{errors.eRating2}</p>}
        <select name="genres" onChange={handleChange}
          onFocus={handleInputFocus}
          onBlur={handleOnBlur}>
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
          {created.genres &&
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
        {onBlurInput.genres && focusedInput.genres && errors.eGenres1 && <p className="error-text">{errors.eGenres1}</p>}
        <label>Imagen</label>
        <input
          placeholder="Ingresa el URL de la imagen de tu videojuego"
          onChange={handleChange}
          name="background_image"
          value={created.background_image}
          onFocus={handleInputFocus}
          onBlur={handleOnBlur}
          className={focusedInput.background_image ? "neon-input" : ""}
        />
        {onBlurInput.background_image && focusedInput.background_image && errors.eImage && <p className="error-text">{errors.eImage}</p>}
        <button type="submit" value="valor" className="neon-button">
          Crear
        </button>
        {/* {postResponse && <p className="success-text">{postResponse}</p>} */}
      </form>
    </div>
  );
};

export default Form;

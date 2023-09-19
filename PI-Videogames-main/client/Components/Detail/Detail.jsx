import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getById, cleanObject, mountComp, unmountComp, deleteVideogame, clean } from "../../Redux/actions";
import { useParams } from "react-router-dom";
import Form from "../Form/Form";
import "./Detail.css";

const Detail = () => {
  const id = useParams().id;
  const videogameDetail = useSelector((state) => state.videogameDetail);
  const mountOrUnmount = useSelector((state) => state.mountOrUnmount)
  const postResponse = useSelector((state)=> state.postResponse)
  const errorResponse = useSelector((state)=> state.errorResponse)
  const dispatch = useDispatch();
  const [dbGame, setDbGame] = useState({
    isDatabase: false,
    edit: false,
    deleteG: false
  })
console.log(postResponse + '   ' + errorResponse);
  useEffect(() => {
    dispatch(getById(id));
    if (isNaN(Number(id))) {
      setDbGame({
        ...dbGame,
        isDatabase: true
      })
    }
    return () => {
      dispatch(cleanObject())
      dispatch(clean())
      dispatch(unmountComp())
    } 
  }, [id]);

  const handleIcons = (e) => {
    console.log(e.target.name);
    if (e.target.name === 'delete') {
      setDbGame({
        ...dbGame,
        deleteG: true
      })
    } else {
      setDbGame({
        ...dbGame,
        [e.target.name]: true
      })
      dispatch(mountComp())
    }
  }
  const handleDelete = (e) => {
    console.log(e.target.name);
    if (e.target.name === 'no-delete') {
      setDbGame({
        ...dbGame,
        deleteG: false
      })
    } else {
      console.log(id);
      dispatch(deleteVideogame(id))
      dispatch(cleanObject())
      dispatch(clean())
      setDbGame({
        ...dbGame,
        deleteG: false
      })
    }
  }
  console.log(mountOrUnmount);
  return (
    <div className={Object.entries(videogameDetail).length !== 0 ? '' : 'detail-container-sonic'}>
      {mountOrUnmount && <Form />}
      {dbGame.deleteG && <div className="ventana-delete"> {/*<img className="error" src='https://images.emojiterra.com/google/noto-emoji/unicode-15/animated/274c.gif' />*/}
        <p>¿Estás seguro de eliminar este videogame?</p>
        <button name='no-delete' className="neon-button" onClick={handleDelete}> No </button>
        <button name='delete' className="neon-button" onClick={handleDelete}>Eliminar</button></div>}

      {Object.entries(videogameDetail).length !== 0 ? <div className={`detail-container ${mountOrUnmount ? 'detail-container-blurred' : ''}`}> <div className="detail-left">
        <img
          className="detail-image"
          src={videogameDetail?.background_image && videogameDetail?.background_image}
          alt={videogameDetail?.name && videogameDetail?.name}
        />
        <p>Plataformas: {videogameDetail?.platforms && videogameDetail?.platforms}</p>
        <p>Géneros: {videogameDetail?.genres && videogameDetail?.genres?.join(', ')}</p>
        <p>Rating: {videogameDetail.rating && videogameDetail.rating}</p>
        <p>Lanzamiento: {videogameDetail.released && videogameDetail.released}</p>
      </div>

      <div className="detail-right">
        {dbGame.isDatabase && <div className="icons-container">  <button name='edit' className="icon-button" onClick={handleIcons}><img name='edit' className='icons' src="https://cdn.iconscout.com/icon/premium/png-256-thumb/edit-3509298-2943427.png?f=webp&w=256" alt="edit" /></button> <button name='delete' className="icon-button" onClick={handleIcons}> <img name='delete' className='icons' src='https://freepngimg.com/thumb/alphabets/22-2-x-alphabet-png.png' alt='Eliminar videogame' /> </button>  </div>}
        <p>{videogameDetail?.name && videogameDetail?.name}</p>
        <p>Descripción: {videogameDetail.description && videogameDetail.description.split('<p>').join('').split('</p>').join('')}</p>
      </div>
      </div> : <h2>{postResponse ? <p>{postResponse}</p>: <div className="sonic-container"><h2>Aquí viene tu videogame!!</h2><img className="sonic" src="https://i.gifer.com/origin/80/80908d38aba2e9a2e49315b0cc20b61b.gif"/></div>}</h2>}
    </div>
  );
};

export default Detail;

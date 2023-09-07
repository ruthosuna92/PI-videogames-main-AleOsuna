import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getById } from "../../Redux/actions";
import { useParams } from "react-router-dom";
import "./Detail.css";

const Detail = () => {
  const id = useParams().id;
  const videogameDetail = useSelector((state) => state.videogameDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getById(id));
  }, [id]);

  return (
    <div className="detail-container">
    <div className="detail-left">
      <img
        className="detail-image"
        src={videogameDetail?.background_image}
        alt={videogameDetail?.name}
      />
      <p>Plataformas: {videogameDetail?.platforms && videogameDetail?.platforms.join(', ')}</p>
      <p>Géneros: {videogameDetail?.genres && videogameDetail?.genres?.join(', ')}</p>
      <p>Rating: {videogameDetail.rating && videogameDetail.rating}</p>
    </div>
    <div className="detail-right">
      <p>{videogameDetail?.name && videogameDetail?.name}</p>
      <p>Descripción: {videogameDetail.description && videogameDetail.description.split('<p>').join('').split('</p>').join('')}</p>
    </div>
  </div>
  
  );
};

export default Detail;

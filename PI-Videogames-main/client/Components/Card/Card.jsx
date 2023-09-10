// Tu componente Card.js
import './Card.css';
import { NavLink } from 'react-router-dom';

const Card = ({ background_image, name, genres, id, index, rating }) => {
    return (
        <div key={index} className="card">
            <div className="card-inner">
                <img className="imgCard" src={background_image} alt={name} />
                <div className="content">
                    <p><NavLink to={`/detail/${id}`} className='text-neon'>{name}</NavLink></p>
                    <p>{genres}</p>
                    <p>{rating}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;

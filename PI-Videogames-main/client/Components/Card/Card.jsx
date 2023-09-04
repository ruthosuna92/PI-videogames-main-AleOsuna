import './Card.css'
import { NavLink } from 'react-router-dom'

const Card = ({background_image, name, genres, id}) => {
    
    return (
        <div key={id} className="card">
            <img className="imgCard" src={background_image } alt={name} />
            <p><NavLink to={`/detail/${id}`}>{name}</NavLink></p>
            <p>{genres}</p>
        </div>
    )
}

export default Card
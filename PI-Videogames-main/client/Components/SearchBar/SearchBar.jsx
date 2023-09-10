// En tu componente SearchBar.jsx
import './SearchBar.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../../Redux/actions';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [busqueda, setBusqueda] = useState({
        name: ''
    });

    const handleChange = (e) => {
        setBusqueda({
            ...busqueda,
            name: e.target.value
        });
    };

    const handleClick = (e) => {
        dispatch(getByName(busqueda.name));
        navigate('/home')
        setBusqueda({
            name: ''
        });
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                value={busqueda.name}
                onChange={handleChange}
                placeholder="Buscar..."
                className="search-input"
            />
            <button onClick={handleClick} className="search-button">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/8336/8336271.png" 
                    alt="Lupa"
                    className="lupa-icon"
                />
            </button>
        </div>
    );
};

export default SearchBar;

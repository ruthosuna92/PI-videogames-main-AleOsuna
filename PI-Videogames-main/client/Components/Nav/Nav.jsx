import React from 'react';
import SearchBar from "../SearchBar/SearchBar"
import { NavLink, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getAllGames, nameSearched } from "../../Redux/actions"
import './Nav.css';

const Nav = () => {
    const location = useLocation().pathname;
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(getAllGames());
        dispatch(nameSearched(''))
    };

    return (
        <div className="nav-container">
            {location !== '/home' && (
                <button className="neon-button-home">
                    <NavLink to='/home' className="neon-link"><img className='reset'src='https://dbdzm869oupei.cloudfront.net/img/sticker/preview/37876.png'/></NavLink>
                </button>
            )}
            {location === '/home' && (
                <button className="neon-button-home" onClick={handleClick}>
                    <img className='reset'src='https://dbdzm869oupei.cloudfront.net/img/sticker/preview/37876.png'/></button>
            )}
           { location !=='/form' && <button className="neon-button">
                <NavLink to='/form' className="neon-link">Crear</NavLink>
            </button>}
            <SearchBar />
        </div>
    );
};

export default Nav;

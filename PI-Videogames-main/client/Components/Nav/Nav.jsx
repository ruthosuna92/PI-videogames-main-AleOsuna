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
                <button className="neon-button">
                    <NavLink to='/home' className="neon-link">Home</NavLink>
                </button>
            )}
            <button className="neon-button">
                <NavLink to='/form' className="neon-link">Create</NavLink>
            </button>
            {location === '/home' && (
                <button className="neon-button" onClick={handleClick}>
                    Reset
                </button>
            )}
            <SearchBar />
        </div>
    );
};

export default Nav;

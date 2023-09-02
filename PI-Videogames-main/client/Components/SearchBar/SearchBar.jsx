import { NavLink } from "react-router-dom"
import { useState } from "react"

const SearchBar = () => {
    const [busqueda, setBusqueda] = useState({
        name: ''
    })
    const handleChange = (e) => {
        setBusqueda({
            ...busqueda,
            name: e.target.value
        })
        
    }
    const handleClick = () => {
        setBusqueda({
            name: ''
        })
    }
    console.log(busqueda);
    return (
        <div>
            <input type='text' value={busqueda.name} onChange={handleChange}></input>
            <button onClick={handleClick}><NavLink to={`/search?name=${busqueda.name}`}>Search</NavLink></button>
        </div>
    )
}

export default SearchBar
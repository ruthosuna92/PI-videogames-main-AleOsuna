import { NavLink } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { getByName } from "../../Redux/actions"

const SearchBar = () => {
    const dispatch = useDispatch()
    const [busqueda, setBusqueda] = useState({
        name: ''
    })
    const handleChange = (e) => {
        setBusqueda({
            ...busqueda,
            name: e.target.value
        })
        
    }
    const handleClick = (e) => {
        dispatch(getByName(busqueda.name))
        setBusqueda({
            name: ''
        })
    }
    console.log(busqueda);
    return (
        <div>
            <input type='text' value={busqueda.name} onChange={handleChange}></input>
            <button onClick={handleClick}>Search</button>
        </div>
    )
}

export default SearchBar
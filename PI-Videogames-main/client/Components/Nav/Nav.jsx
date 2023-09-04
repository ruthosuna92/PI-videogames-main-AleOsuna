import SearchBar from "../SearchBar/SearchBar"
import { NavLink, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getAllGames } from "../../Redux/actions"

const Nav = () => {
    const location = useLocation().pathname
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(getAllGames())
    }
    return (
        <div>
            {<SearchBar/>}
            {location !== '/home' && <button><NavLink to='/home'>Home</NavLink></button>}
            <button><NavLink to='/form'>Create</NavLink></button>
            {location === '/home' && <button onClick={handleClick}>Reset</button>}
        </div>
    )
}

export default Nav
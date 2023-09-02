import SearchBar from "../SearchBar/SearchBar"
import { NavLink } from "react-router-dom"

const Nav = () => {
    return (
        <div>
            {<SearchBar/>}
            <button><NavLink to='/home'>Home</NavLink></button>
            <button><NavLink to='/form'>Create</NavLink></button>
        </div>
    )
}

export default Nav
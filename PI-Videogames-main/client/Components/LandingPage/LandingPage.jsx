import {NavLink} from 'react-router-dom'

const LandingPage = () => {
    return (
        <div>
            <button><NavLink to='/home'> Home </NavLink> </button>
            <p>Soy la landing Page!!!</p>
        </div>
    )
}

export default LandingPage
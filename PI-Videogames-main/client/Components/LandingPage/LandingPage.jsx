import {NavLink} from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className='container'>
            <NavLink to='/home' className="button-neon"> Home </NavLink> 
            <p>Soy la landing Page!!!</p>
        </div>
    )
}

export default LandingPage
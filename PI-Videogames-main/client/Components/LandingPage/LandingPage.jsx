import {NavLink} from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className='container'>
            <NavLink to='/home' className="button-neon"> Home </NavLink> 
           
        </div>
    )
}

export default LandingPage
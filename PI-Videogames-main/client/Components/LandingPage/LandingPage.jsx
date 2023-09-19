import {NavLink} from 'react-router-dom'
import './LandingPage.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllGenres } from '../../Redux/actions'

const LandingPage = () => {
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getAllGenres())
    }, [])
    
    return (
        <div className='container'>
            <h1>Dale Play y conoce los videojuegos más Populares!!</h1>
            <NavLink to='/home' className="button-neon"><img className='imagen-play' src='https://png.pngtree.com/png-clipart/20230407/ourmid/pngtree-neon-play-button-glowing-glassmorphism-icons-png-image_6689730.png'/></NavLink>
            <img src='https://i.pinimg.com/originals/99/d5/75/99d57579caaa6c061b2172d2e8030a78.gif' className='mario-bailando'/>
           
        </div>
    )
}

export default LandingPage
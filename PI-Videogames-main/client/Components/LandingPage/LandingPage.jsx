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
            <NavLink to='/home' className="button-neon"><img className='imagen-play' src='https://png.pngtree.com/png-clipart/20230407/ourmid/pngtree-neon-play-button-glowing-glassmorphism-icons-png-image_6689730.png'/></NavLink> 
           
        </div>
    )
}

export default LandingPage
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
            <NavLink to='/home' className="button-neon"> Home </NavLink> 
           
        </div>
    )
}

export default LandingPage
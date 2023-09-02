import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LandingPage from '../Components/LandingPage/LandingPage';
import Home from '../Components/Home/Home';
import Detail from '../Components/Detail/Detail';
import Form from '../Components/Form/Form';
import Nav from '../Components/Nav/Nav';








function App() {
  const location = useLocation().pathname;

  return (
    <div>
       {location !== '/' ? <Nav /> : null}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/form' element={<Form/>} />
        
      </Routes>
       
    </div>
  )
}

export default App

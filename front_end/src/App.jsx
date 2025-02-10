import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './assets/pages/Home'
import Login from './assets/pages/authPage/Login'
import SignUp from './assets/pages/authPage/SignUp'
import OTPverify from './assets/pages/authPage/OTPverify'
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/otpverify' element={<OTPverify/>}/>
      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

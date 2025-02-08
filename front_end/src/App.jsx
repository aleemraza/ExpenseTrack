import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './assets/pages/Home'
import Login from './assets/pages/authPage/Login'
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

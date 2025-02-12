import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../src/assets/utlis/ProtectedRoute'
import Home from './assets/pages/Home'
import Login from './assets/pages/authPage/Login'
import SignUp from './assets/pages/authPage/SignUp'
import OTPverify from './assets/pages/authPage/OTPverify'
import Main from './assets/pages/dashbaord/Main'
import Page_Not_Found from './assets/pages/Page_Not_Found'
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/otpverify' element={<ProtectedRoute allowedRoles={['user']}><OTPverify/></ProtectedRoute>}/>
        <Route path='/dashbaord' element={<ProtectedRoute allowedRoles={['user']}><Main/></ProtectedRoute>}/>
        <Route path='*' element={<Page_Not_Found/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

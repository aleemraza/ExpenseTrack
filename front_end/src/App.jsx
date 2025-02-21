import { useState,useEffect } from 'react'
import './App.css'
import {BrowserRouter,Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../src/assets/utlis/ProtectedRoute'
import Home from './assets/pages/Home'
import Login from './assets/pages/authPage/Login'
import SignUp from './assets/pages/authPage/SignUp'
import OTPverify from './assets/pages/authPage/OTPverify'
import Main from './assets/pages/dashbaord/Main'
import Page_Not_Found from './assets/pages/Page_Not_Found'


import UserHome from './assets/pages/dashbaord/rolePages/userPages/UserHome'
import AdminHome from './assets/pages/dashbaord/rolePages/adminPages/AdminHome'
import User_Report from './assets/pages/dashbaord/rolePages/userPages/User_Report'

import { useDispatch, useSelector } from 'react-redux';
import {Login_User_API} from './redux/API/api'
import ContactUs from './assets/pages/ContactUs'
function App() {
  const dispatch = useDispatch();
  const {token,role} = useSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      dispatch(Login_User_API());
    }
  }, [dispatch, token]);
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/otpverify' element={<ProtectedRoute allowedRoles={['user']}><OTPverify/></ProtectedRoute>}/>
        
        {/* User Role */}
        <Route path='/userdashbaord' element={<Main/>}>
          <Route path='userhome' element={<ProtectedRoute allowedRoles={['user']}><UserHome/></ProtectedRoute>}/>
          <Route path='userreport' element={<ProtectedRoute allowedRoles={['user']}><User_Report/></ProtectedRoute>}/>
        </Route>
        {/* Admin Role */}
        <Route path='/admindashbaord' element={<Main/>}>
          <Route path='adminhome' element={<ProtectedRoute allowedRoles={['admin']}><AdminHome/></ProtectedRoute>}/>
        </Route>

        {/* <Route path='/dashbaord' element={<ProtectedRoute allowedRoles={['user']}><Main/></ProtectedRoute>}/> */}
        <Route path='*' element={<Page_Not_Found/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

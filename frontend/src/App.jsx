import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/login.jsx';
import Signup from './pages/signup/signup.jsx';
import StartPage from './pages/start/start.jsx';
import UserHome from './pages/userHome/userHome.jsx';
import GuestCommenting from './pages/guestCommenting/guestCommenting.jsx';

const App = () => {
  return (
    <Routes>
      <Route index element={<StartPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/home' element={<UserHome/>}/>
      <Route path='/comment/:userID' element={<GuestCommenting/>}/>
    </Routes>
  )
}

export default App

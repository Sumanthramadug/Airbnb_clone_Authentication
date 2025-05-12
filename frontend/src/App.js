import React from 'react'
import {Routes,Route} from 'react-router-dom'
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Layout from './Pages/Layout';
import { ToastContainer } from 'react-toastify';
import ResetPassword from './Pages/ResetPassword';
import NewPassword from './Pages/NewPassword';
function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route path="/" element={<HomePage />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
        <Route path='/newPassword' element={<NewPassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

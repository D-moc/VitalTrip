import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<h1>User Register</h1>} />
        <Route path="/user/login" element={<h1>User Login</h1>} />
        <Route path="/user/dashboard" element={<h1>User Dashboard</h1>} />
        <Route path ="/admin/register" element={<h1>Admin Register</h1>} />
        <Route path="/admin/login" element={<h1>Admin Login</h1>} />
        <Route path="/admin/dashboard" element={<h1>Admin Dashboard</h1>} />
      </Routes>
    </Router>
  )
}

export default AppRoutes

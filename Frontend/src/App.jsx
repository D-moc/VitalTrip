import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Explore from "./components/Explore/Explore"
import Services from './components/Services/Services'
import Blogs from './components/Blogs/Blogs'
import Footer from "./components/Footer/Footer"
import Chatbot from './components/Assistant/Chatbot'




function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Explore />
      <Services />
      <Blogs />
      <Footer />
      <Chatbot />
    </div>
  )
}

export default App


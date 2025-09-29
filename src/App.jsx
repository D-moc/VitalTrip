import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Explore from "./components/Explore/Explore"
import Services from './components/Services/Services'
import Blogs from './components/Blogs/Blogs'
// import Contact from './components/Contact/Contact'
import Footer from "./components/Footer/Footer"


function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Explore />
      <Services />
      <Blogs />
      {/* <Contact /> */}
      <Footer />
    </div>
  )
}

export default App


// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar/Navbar";
// import Home from "./components/Home/Home";
// import Explore from "./components/Explore/Explore";
// import Services from "./components/Services/Services";
// import Blogs from "./components/Blogs/Blogs";
// import Footer from "./components/Footer/Footer";
// import Chatbot from "./components/Assistant/Chatbot";
// import UserSignup from "./Auth/UserSignup";
// import UserLogin from "./Auth/UserLogin";
// import CaptainLogin from "./Auth/CaptainLogin"; 
// import UserDashboard from "./Auth/UserDashboard";
// import CaptainSignUp from "./Auth/CaptainSignUp";
// import CaptainDashboard from "./Auth/CaptainDashboard";
// import ForgotPassword from "./Auth/ForgotPassword";

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//               <Home />
//               <Explore />
//               <Services />
//               <Blogs />
//               <Footer />
//               <Chatbot />
//             </>
//           }
//         />

//         {/* Separate Signup page */}
//         <Route path="/signup" element={<UserSignup />} />
//         <Route path="/login" element={<UserLogin />} />
//        <Route path="/user-dashboard" element={<UserDashboard />} />
//         <Route path="/captain-login" element={<CaptainLogin />} />
//         <Route path="/captain-signup" element={<CaptainSignUp />} />
//         <Route path="/captain-dashboard" element={<CaptainDashboard />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
        
       
        
//         {/* <Route path="/your-trips" element={<div>My Trips</div>} />
//         <Route path="/reviews" element={<div>Reviews</div>} /> */}
        

//       </Routes>
//     </>
//   );
// }

// export default App;


import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
// import Navbar from "./Pages/Navbar";
import Home from "./components/Home/Home";
import Explore from "./components/Explore/Explore";
import Services from "./components/Services/Services";
import Blogs from "./components/Blogs/Blogs";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Assistant/Chatbot";

import UserSignup from "./Auth/UserSignup";
import UserLogin from "./Auth/UserLogin";
import CaptainLogin from "./Auth/CaptainLogin";
import CaptainSignUp from "./Auth/CaptainSignUp";
import UserDashboard from "./Auth/UserDashboard";
import CaptainDashboard from "./Auth/CaptainDashboard";
import ForgotPassword from "./Auth/ForgotPassword";

import ProtectedRoute from "./utils/ProtectedRoutes"; // ✅ import here

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Explore />
              <Services />
              <Blogs />
              <Footer />
              <Chatbot />
            </>
          }
        />

        {/* Auth Routes */}
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Dashboards */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute allowedRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/captain-dashboard"
          element={
            <ProtectedRoute allowedRole="captain">
              <CaptainDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

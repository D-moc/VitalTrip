import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
// import DestinationDetails from "./pages/DestinationDetails";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs"; 
import AllBlogs from "./pages/AllBlogs"; 
import BlogDetails from "./pages/BlogDetails"; 
import PlanTrip from "./pages/PlanTrip";
import Booking from "./pages/Booking";
import AuthPage from "./pages/AuthPage";
import CaptainDashboard from "./pages/CaptainDashboard";
import UserDashboard from "./pages/UserDashboard";
import Footer from "./components/footer";
import Guides from "./pages/Guides";
import GuideDetails from "./pages/GuideDetails";
import TripDetails from "./pages/TripDetails";


const App = () => {
  const location = useLocation();


  const hideNavbar = location.pathname.startsWith("/destinations/");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Destinations />
              <Services />
              <Blogs /> 
              <Footer />
            </>
          }
        />
        
        <Route path="/destinations/:id" element={<TripDetails />} />

        {/* ✅ Static and functional pages */}
        <Route path="/plan-trip" element={<PlanTrip />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/captain/dashboard" element={<CaptainDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />

        {/* ✅ Blog Routes */}
        <Route path="/blogs" element={<AllBlogs />} /> {/* full blog list */}
        <Route path="/blogs/:id" element={<BlogDetails />} /> {/* single blog */}

        {/* ✅ Services & related pages */}
        <Route path="/services" element={<Services />} />
        <Route path="/guides" element={<Guides />} />

        
        
      </Routes>
    </>
  );
};

export default App;

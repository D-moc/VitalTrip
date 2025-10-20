import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import DestinationDetails from "./components/Home/DestinationDetails";

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
import ProtectedRoute from "./utils/ProtectedRoutes";

import PlanTrip from "./components/Trip/PlanTrip";
import TripDetails from "./components/Trip/TripDetails";

function App() {
  return (
    <>
      <Routes>
        {/* 🏠 Home Page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Explore />
              <Services />
              <Blogs />
              <Footer />
              <Chatbot />
            </>
          }
        />

        {/* ✈️ Plan Trip Page — ❌ No Navbar */}
        <Route path="/plan-trip" element={<PlanTrip />} />

        {/* 🗺️ Trip Details Page — ❌ No Navbar */}
        <Route path="/trip-details" element={<TripDetails />} />

        {/* 🔐 Auth Routes */}
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* 👥 Dashboards */}
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

        {/* 🏞️ Destination Details */}
        <Route path="/destination/:id" element={<DestinationDetails />} />
      </Routes>
    </>
  );
}

export default App;


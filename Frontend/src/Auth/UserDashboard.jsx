import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("storage")); // ✅ Update navbar immediately
    navigate("/");
  };

  return (
    <div className="dashboard-section">
      <div className="dashboard-container">
        <h2>
          Welcome to <span>VitalTrip</span> Dashboard
        </h2>
        <p className="subtitle">Manage your trips, share experiences, and more ✈️</p>

        <div className="dashboard-grid">
          {/* My Trips */}
          <div className="dashboard-card" onClick={() => navigate("/your-trips")}>
            <img
              src="https://img.freepik.com/free-vector/travel-booking-concept-illustration_114360-7573.jpg"
              alt="My Trips"
            />
            <h3>My Trips</h3>
            <p>View and manage all your past and upcoming adventures.</p>
          </div>

          {/* Reviews */}
          <div className="dashboard-card" onClick={() => navigate("/reviews")}>
            <img
              src="https://img.freepik.com/free-vector/customer-review-concept-illustration_114360-6971.jpg"
              alt="Reviews"
            />
            <h3>Reviews</h3>
            <p>Read your submitted reviews or share feedback about your trips.</p>
          </div>

          {/* Sign Out */}
          <div className="dashboard-card signout-card" onClick={handleSignOut}>
            <img
              src="https://img.freepik.com/free-vector/logout-concept-illustration_114360-7398.jpg"
              alt="Sign Out"
            />
            <h3>Sign Out</h3>
            <p>Log out of your account securely and return to the home page.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;

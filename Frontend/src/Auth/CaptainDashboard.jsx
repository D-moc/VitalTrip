import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CaptainDashboard.css";

function CaptainDashboard() {
  const [captain, setCaptain] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/captain-login");
      return;
    }

    fetch("/captains/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCaptain(data.captain))
      .catch(() => navigate("/captain-login"));
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
    await fetch("/captains/logout", {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="captain-dashboard">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>
            Welcome, <span>{captain?.fullname?.firstname || "Captain"}</span> 🚘
          </h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <section className="dashboard-content">
          <div className="dashboard-card">
            <h3>Your Profile</h3>
            <p><strong>Name:</strong> {captain?.fullname?.firstname} {captain?.fullname?.lastname}</p>
            <p><strong>Email:</strong> {captain?.email}</p>
          </div>

          <div className="dashboard-card">
            <h3>Trip Management</h3>
            <p>View and manage your assigned trips here (coming soon).</p>
          </div>

          <div className="dashboard-card">
            <h3>Messages</h3>
            <p>Stay connected with your clients (feature in progress).</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CaptainDashboard;

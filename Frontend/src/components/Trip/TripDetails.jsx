import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import "./TripDetails.css";

function TripDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check if we already got trip from state (after submission)
  const tripFromState = location.state?.trip;

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // 🔒 Not logged in → redirect
    if (!token) {
      navigate("/login");
      return;
    }

    // ✅ If trip passed via state, show it instantly
    if (tripFromState) {
      setTrip(tripFromState);
      setLoading(false);
    } else {
      // 🧭 Otherwise, fetch from backend (user’s recent trip)
      fetchUserTrips();
    }
  }, []);

  const fetchUserTrips = async () => {
    try {
      const res = await api.get("/trips/my-trips");
      const trips = res.data.trips;

      if (trips.length === 0) {
        navigate("/plan-trip");
        return;
      }

      // 🆕 Show the latest trip
      setTrip(trips[0]);
    } catch (err) {
      console.error("Error fetching trips:", err);
      navigate("/plan-trip");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="tripdetails-loading">
        <h3>Loading your trip details...</h3>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="tripdetails-error">
        <h3>No trip found. Please plan a trip first.</h3>
        <button onClick={() => navigate("/plan-trip")}>Plan New Trip</button>
      </div>
    );
  }

  return (
    <section className="tripdetails-page">
      <div className="tripdetails-container">
        <h1 className="tripdetails-title">✨ Your Planned Trip ✨</h1>

        <div className="tripdetails-card">
          <h2>🏙️ Destination: {trip.destination}</h2>
          <p>
            <strong>Days:</strong> {trip.days}
          </p>
          <p>
            <strong>Travellers:</strong> {trip.travellers}
          </p>
          <p>
            <strong>Budget:</strong> ₹{trip.budget}
          </p>
          <p>
            <strong>Transport:</strong> {trip.transport}
          </p>
          <p>
            <strong>Accommodation:</strong> {trip.stay}
          </p>
          <p>
            <strong>Interests:</strong>{" "}
            {trip.itinerary && trip.itinerary.join(", ")}
          </p>
        </div>

        <div className="nearby-section">
          <h2>Nearby Essentials</h2>
          <ul>
            <li>🏨 <strong>Hotel:</strong> {trip.destination} Grand Inn</li>
            <li>🚑 <strong>Hospital:</strong> CityCare Hospital, {trip.destination}</li>
            <li>🚌 <strong>Bus Stop:</strong> Main City Bus Depot</li>
            <li>🚓 <strong>Police Station:</strong> Central Police HQ</li>
            <li>☕ <strong>Café:</strong> BrewBuzz Café</li>
          </ul>
        </div>

        {/* 🡐 Back Button */}
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    </section>
  );
}

export default TripDetails;

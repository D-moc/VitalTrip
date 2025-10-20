import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaRupeeSign, FaArrowLeft } from "react-icons/fa";
import "./DestinationDetails.css";

function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = "http://localhost:4000/api/destinations";

  useEffect(() => {
    async function fetchDestination() {
      try {
        const res = await fetch(`${API_BASE}/${id}`); // ✅ correct API call to single destination
        const data = await res.json();

        if (res.ok) {
          setDestination(data.destination);
        } else {
          setError(data.message || "Destination not found");
        }
      } catch (err) {
        console.error("Error fetching destination:", err);
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchDestination();
  }, [id]);

  if (loading) return <p className="loading">Loading destination...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!destination) return <p className="error">Destination not found.</p>;

  return (
    <section className="destination-details">
      <div className="details-container">
        {/* 🔙 Back Button */}
        <button className="back-btn" onClick={() => navigate("/")}>
          <FaArrowLeft /> Back to All
        </button>

        {/* 🏞️ Header */}
        <h1>{destination.name}</h1>
        <p className="location">
          <FaMapMarkerAlt /> {destination.location}
        </p>

        {/* 📸 Image */}
        <img
          src={destination.image || "https://via.placeholder.com/800x400"}
          alt={destination.name}
          className="main-image"
        />

        {/* 📖 Description */}
        <div className="section">
          <h2>About {destination.name}</h2>
          <p>{destination.description}</p>
        </div>

        {/* 🧭 Info Cards */}
        <div className="info-grid">
          <div className="info-card">
            <h3><FaClock /> Best Time to Visit</h3>
            <p>{destination.bestTimeToVisit || "Not specified"}</p>
          </div>

          <div className="info-card">
            <h3>Accessibility</h3>
            <p>{destination.accessibility || "Information unavailable"}</p>
          </div>

          <div className="info-card">
            <h3><FaRupeeSign /> Budget</h3>
            <p>{destination.budget || "Not specified"}</p>
          </div>

          <div className="info-card">
            <h3>Routes</h3>
            {destination.routes && destination.routes.length > 0 ? (
              <ul>
                {destination.routes.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            ) : (
              <p>No routes available.</p>
            )}
          </div>
        </div>

        {/* 🗺️ Map Section */}
        <div className="map-section">
          <iframe
            title="Destination Map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(destination.name)}&output=embed`}
            width="100%"
            height="400"
            style={{ border: "none", borderRadius: "12px" }}
            allowFullScreen
          ></iframe>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="google-btn"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

export default DestinationDetails;

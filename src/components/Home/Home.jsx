import React, { useState } from "react";
import "./Home.css";
import { FaSearch } from "react-icons/fa";

function Home() {
  const [showPlanner, setShowPlanner] = useState(false);
  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    activities: "",
  });
  const [itinerary, setItinerary] = useState(null);

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const days = Math.max(
      1,
      Math.ceil(
        (new Date(trip.endDate) - new Date(trip.startDate)) /
          (1000 * 60 * 60 * 24)
      )
    );

    const plan = Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      activity: trip.activities || "Explore and enjoy your trip!",
    }));

    setItinerary(plan);
  };

  return (
    <section id="home" className="home">
      <div className="overlay"></div>
      <div className="home-container">
        
        {/* Hero Text */}
        <h1 className="home-title">
          DISCOVER HIDDEN GEMS AND LOCAL SECRETS
        </h1>
        <p className="home-subtitle">
         <i> Plan your trips, explore destinations, and travel smarter with VitalTrip.</i>
        </p>

        {/* Search Bar */}
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search destinations, trips, guides..." 
          />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>

        {/* Plan Trip Button */}
        <button className="plan-btn" onClick={() => setShowPlanner(true)}>
          Plan Your Trip
        </button>
      </div>

      {/* Trip Planner Modal */}
      {showPlanner && (
        <div className="planner-overlay">
          <div className="planner-card">
            <h2>Plan Your Trip</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="destination"
                placeholder="Destination"
                value={trip.destination}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="startDate"
                value={trip.startDate}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="endDate"
                value={trip.endDate}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="activities"
                placeholder="Preferred Activities (optional)"
                value={trip.activities}
                onChange={handleChange}
              />
              <button type="submit" className="btn auth-btn">
                Generate Itinerary
              </button>
            </form>

            {/* Itinerary Result */}
            {itinerary && (
              <div className="itinerary">
                <h3>Your Itinerary</h3>
                {itinerary.map((day) => (
                  <div key={day.day} className="itinerary-day">
                    <strong>Day {day.day}:</strong> {day.activity}
                  </div>
                ))}
              </div>
            )}

            <button className="close-btn" onClick={() => setShowPlanner(false)}>
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Home


import React, { useState } from "react";
import "./Home.css";
import { FaSearch } from "react-icons/fa";
import backgroundimageImg from "../../assets/backgroundimage.jpeg";

function Home() {
  const [showPlanner, setShowPlanner] = useState(false);
  const [trip, setTrip] = useState({
    city: "",
    days: 1,
    travellers: 1,
    interests: [],
    budget: 1000,
    transport: "",
    stay: "",
  });
  const [itinerary, setItinerary] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  // handle checkbox group
  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    let updated = [...trip.interests];
    if (checked) {
      updated.push(value);
    } else {
      updated = updated.filter((i) => i !== value);
    }
    setTrip({ ...trip, interests: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const days = Math.max(1, parseInt(trip.days));
    const plan = Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      activity:
        trip.interests.length > 0
          ? `Enjoy ${trip.interests.join(", ")}`
          : "Explore and enjoy your trip!",
    }));
    setItinerary(plan);
  };


  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // List of valid slugs 
    const destinations = [
      "ajoba-fort-trek",
      "rajmachi-fort",
      "harishchandragad",
      "sinhagad-fort",
      "torna-fort",
      "kaas-plateau",
      "bhandardara",
      "thoseghar-waterfalls",
    ];

    
    const formattedQuery = searchQuery.toLowerCase().replace(/\s+/g, "-");

    
    let matched = destinations.find((d) => d === formattedQuery);

    
    if (!matched) {
      matched = destinations.find((d) => d.includes(formattedQuery));
    }

    if (matched) {
      const target = document.getElementById(matched);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      alert(`Sorry, "${searchQuery}" is not in our destinations.`);
    }
  };
  

  return (
    <section id="home" className="home">
      <div className="overlay"></div>
      <div className="home-container">
        {/* Hero Text */}
        <h1 className="home-title">DISCOVER HIDDEN GEMS AND LOCAL SECRETS</h1>
        <p className="home-subtitle">
          <i>
            Plan your trips, explore destinations, and travel smarter with
            VitalTrip.
          </i>
        </p>

        {/* Search */}
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search destinations, trips, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <FaSearch />
          </button>
        </form>

        {/* Plan Trip Button */}
        <button className="plan-btn" onClick={() => setShowPlanner(true)}>
          Plan Your Trip
        </button>
      </div>

      {/* Trip Planner Modal */}
      {showPlanner && (
        <div className="planner-overlay">
          <div className="planner-card">
            <h2>Plan Your Trip!!</h2>
            <form onSubmit={handleSubmit}>
              {/* City */}
              <label>Enter City:</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={trip.city}
                onChange={handleChange}
                required
              />

              {/* Days */}
              <label>No. of Days:</label>
              <select name="days" value={trip.days} onChange={handleChange}>
                {[...Array(15)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              {/* Travellers */}
              <label>No. of Travellers:</label>
              <select
                name="travellers"
                value={trip.travellers}
                onChange={handleChange}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              {/* Budget */}
              <label>Budget Range:</label>
              <input
                type="range"
                min="1000"
                max="100000"
                step="500"
                name="budget"
                value={trip.budget}
                onChange={handleChange}
              />
              <p>Selected Price: {trip.budget}</p>

              <button type="submit" className="btn auth-btn">
                Generate Itinerary
              </button>
            </form>

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

export default Home;

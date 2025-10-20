import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";
import "./PlanTrip.css";

function PlanTrip() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [trip, setTrip] = useState({
    city: "",
    days: 1,
    travellers: 1,
    interests: [],
    budget: 5000,
    transport: "",
    accommodation: "",
  });

  // 🌀 Handle text, select inputs
  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  // ✅ Handle checkbox (interests)
  const handleInterestChange = (e) => {
    const value = e.target.value;
    setTrip((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((i) => i !== value)
        : [...prev.interests, value],
    }));
  };

  // 🚀 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.warn("Please log in to plan your trip.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/trips/create", {
        destination: trip.city,
        days: trip.days,
        travellers: trip.travellers,
        budget: trip.budget,
        transport: trip.transport,
        stay: trip.accommodation,
        itinerary: trip.interests,
      });

      toast.success("🎉 Trip planned successfully!");
      navigate("/trip-details", { state: { trip: res.data.trip } });
    } catch (err) {
      console.error("Error creating trip:", err);
      toast.error(err.response?.data?.message || "Failed to plan trip. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="plantrip-page">
      <div className="plantrip-container">
        {/* ❌ Close button returns to home */}
        <button className="close-btn" onClick={() => navigate("/")}>
          <FaTimes />
        </button>

        <h1 className="plantrip-title">✨ Plan Your Trip ✨</h1>

        <form onSubmit={handleSubmit} className="trip-form">
          {/* City */}
          <div className="form-group">
            <label>Enter City:</label>
            <input
              type="text"
              name="city"
              placeholder="e.g., Pune, Mumbai..."
              value={trip.city}
              onChange={handleChange}
              required
            />
          </div>

          {/* Days */}
          <div className="form-group">
            <label>No. of Days:</label>
            <select name="days" value={trip.days} onChange={handleChange}>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Travellers */}
          <div className="form-group">
            <label>No. of Travellers:</label>
            <select
              name="travellers"
              value={trip.travellers}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Interests */}
          <div className="form-group">
            <label>Interests:</label>
            <div className="checkbox-group">
              {["Nature", "Food", "Culture", "Hiking", "Museums/History"].map(
                (interest) => (
                  <label key={interest}>
                    <input
                      type="checkbox"
                      value={interest}
                      checked={trip.interests.includes(interest)}
                      onChange={handleInterestChange}
                    />
                    {interest}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Budget */}
          <div className="form-group">
            <label>Budget Range:</label>
            <input
              type="range"
              name="budget"
              min="1000"
              max="20000"
              step="500"
              value={trip.budget}
              onChange={handleChange}
            />
            <p className="selected-price">Selected Price: ₹{trip.budget}</p>
          </div>

          {/* Transportation */}
          <div className="form-group">
            <label>Transportation:</label>
            <div className="radio-group">
              {["Car/Bike", "Flight", "Train", "Bus", "Cruise"].map((mode) => (
                <label key={mode}>
                  <input
                    type="radio"
                    name="transport"
                    value={mode}
                    checked={trip.transport === mode}
                    onChange={handleChange}
                  />
                  {mode}
                </label>
              ))}
            </div>
          </div>

          {/* Accommodation */}
          <div className="form-group">
            <label>Accommodation:</label>
            <div className="radio-group">
              {["Hotel", "Hostel", "Airbnb", "Camping"].map((stay) => (
                <label key={stay}>
                  <input
                    type="radio"
                    name="accommodation"
                    value={stay}
                    checked={trip.accommodation === stay}
                    onChange={handleChange}
                  />
                  {stay}
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Planning your trip..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PlanTrip;

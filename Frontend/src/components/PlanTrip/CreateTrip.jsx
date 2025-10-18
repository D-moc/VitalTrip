import React, { useState } from "react";
import "./CreateTrip.css";

function CreateTrip() {
  const [trips, setTrips] = useState([
    { id: 1, name: "Goa Getaway", days: 3 },
    { id: 2, name: "Himalaya Trek", days: 7 },
  ]);

  const addTrip = () => {
    const newTrip = { id: Date.now(), name: "Untitled Trip", days: 1 };
    setTrips([...trips, newTrip]);
  };

  return (
    <section className="create-trip-section" id="create-trip">
      <div className="create-trip-container">
        
        {/* Hero Heading */}
        <h2 className="create-trip-title">Plan Your Next Trip</h2>
        <p className="create-trip-subtitle">
          Create new trips or view your saved itineraries.
        </p>

        {/* Create Trip Button */}
        <button className="new-trip-btn" onClick={addTrip}>
          + New Trip
        </button>

        {/* My Trips */}
        <div className="trip-list">
          {trips.length === 0 ? (
            <p className="empty-msg">No trips yet. Start by creating one!</p>
          ) : (
            trips.map((trip) => (
              <div className="trip-card" key={trip.id}>
                <h4>{trip.name}</h4>
                <p>{trip.days} Days Itinerary</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default CreateTrip;


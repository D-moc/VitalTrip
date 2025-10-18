import React, { useState } from "react";
import "./HealthHub.css";

function HealthHub() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const findDoctors = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Overpass API (OpenStreetMap) query
          const query = `
            [out:json];
            (
              node["amenity"="hospital"](around:3000,${latitude},${longitude});
              node["amenity"="doctors"](around:3000,${latitude},${longitude});
            );
            out;
          `;

          const response = await fetch("https://overpass-api.de/api/interpreter", {
            method: "POST",
            body: query,
          });

          const data = await response.json();

          if (data.elements) {
            const formatted = data.elements.map((place, index) => ({
              id: place.id || index,
              name: place.tags.name || "Unnamed Facility",
              specialty: place.tags.amenity || "Medical",
              contact: place.tags.phone || "Contact not available",
              location: { lat: place.lat, lng: place.lon },
            }));

            setDoctors(formatted);
          }
        } catch (error) {
          console.error("Error fetching OSM data:", error);
        }

        setLoading(false);
      },
      () => {
        alert("Unable to get location");
        setLoading(false);
      }
    );
  };

  const openInMaps = (lat, lng) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  return (
    <section className="healthhub-section" id="health">
      <div className="healthhub-container">
        <h2 className="healthhub-title">Health Hub</h2>
        <p className="healthhub-subtitle">
          Find nearby doctors and health facilities with GPS.
        </p>

        <button className="gps-btn" onClick={findDoctors}>
          📍 Find Nearby Doctors
        </button>

        {loading && <p className="loading-text">Fetching nearby doctors...</p>}

        <div className="doctors-list">
          {doctors.length === 0 && !loading ? (
            <p className="empty-msg">No doctors loaded. Click the button above.</p>
          ) : (
            doctors.map((doc) => (
              <div className="doctor-card" key={doc.id}>
                <h3>{doc.name}</h3>
                <p>{doc.specialty}</p>
                <p>📞 {doc.contact}</p>
                <button
                  className="map-btn"
                  onClick={() => openInMaps(doc.location.lat, doc.location.lng)}
                >
                  View on Map
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default HealthHub;

import React, { useState } from "react";
import "./Services.css";
import { FaHospital, FaPlane, FaHotel, FaAmbulance, FaMapMarkerAlt } from "react-icons/fa";

function Services() {
  const services = [
    {
      id: 1,
      icon: <FaHospital className="service-icon" />,
      title: "Health Hub",
      desc: "Find nearby hospitals, pharmacies, and health facilities at your destination.",
      details: "With Health Hub, you can quickly locate the nearest hospitals, pharmacies, and clinics using live GPS data.",
      location: "https://www.google.com/maps/search/hospitals+near+me/",
    },
    {
      id: 2,
      icon: <FaAmbulance className="service-icon" />,
      title: "Emergency Services",
      desc: "Quick access to police, ambulance, and embassy contacts anywhere you travel.",
      details: "Access emergency numbers, embassy contacts, and get immediate directions to the nearest help center.",
      location: "https://www.google.com/maps/search/police+station+near+me/",
    },
    {
      id: 3,
      icon: <FaHotel className="service-icon" />,
      title: "Accommodation",
      desc: "Discover hotels, homestays, and eco-friendly lodging options nearby.",
      details: "Find budget hotels, premium stays, and sustainable lodging based on your preferences.",
      location: "https://www.google.com/maps/search/hotels+near+me/",
    },
    {
      id: 4,
      icon: <FaPlane className="service-icon" />,
      title: "Flights",
      desc: "Compare flight options and book the best travel routes for your trip.",
      details: "Search and compare flight tickets across multiple airlines and get the best prices.",
      location: "https://www.google.com/flights",
    },
  ];

  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        {/* Heading */}
        <h2 className="services-title">Travel Assistance Hub</h2>
        <p className="services-subtitle">
          Everything you need for a safe, smooth, and enjoyable journey.
        </p>

        {/* Service Grid */}
        {!selectedService ? (
          <div className="services-grid">
            {services.map((service) => (
              <div className="service-card" key={service.id}>
                {service.icon}
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <button
                  className="see-more"
                  onClick={() => setSelectedService(service)}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="service-details">
            <button className="back-btn" onClick={() => setSelectedService(null)}>
              ← Back
            </button>
            <div className="details-card">
              {selectedService.icon}
              <h3>{selectedService.title}</h3>
              <p>{selectedService.details}</p>

              {/* Map / GPS */}
              <div className="map-box">
                <FaMapMarkerAlt className="map-icon" />
                <a
                  href={selectedService.location}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Location in Maps
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;

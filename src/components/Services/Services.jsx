import React from "react";
import "./Services.css";
import { FaHospital, FaPlane, FaHotel, FaAmbulance } from "react-icons/fa";

function Services() {
  const services = [
    {
      icon: <FaHospital className="service-icon" />,
      title: "Health Hub",
      desc: "Find nearby hospitals, pharmacies, and health facilities at your destination.",
    },
    {
      icon: <FaAmbulance className="service-icon" />,
      title: "Emergency Services",
      desc: "Quick access to police, ambulance, and embassy contacts anywhere you travel.",
    },
    {
      icon: <FaHotel className="service-icon" />,
      title: "Accommodation",
      desc: "Discover hotels, homestays, and eco-friendly lodging options nearby.",
    },
    {
      icon: <FaPlane className="service-icon" />,
      title: "Flights",
      desc: "Compare flight options and book the best travel routes for your trip.",
    },
  ];

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        {/* Heading */}
        <h2 className="services-title">Our Services</h2>
        <p className="services-subtitle">
          Everything you need for a safe, smooth, and enjoyable journey.
        </p>

        {/* Service Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              {service.icon}
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <button className="see-more">Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHospital, FaHotel, FaUserTie } from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaHospital size={36} />,
    title: "Nearby Hospitals",
    desc: "Locate hospitals, clinics, and emergency medical facilities wherever you travel in Maharashtra.",
    link: "https://www.google.com/maps/search/hospitals+near+me/",
    external: true,
  },
  {
    id: 2,
    icon: <FaHotel size={36} />,
    title: "Accommodation",
    desc: "Find and book comfortable hotels, homestays, and resorts with trusted traveler reviews.",
    link: "https://www.google.com/maps/search/hotels+near+me/",
    external: true,
  },
  {
    id: 3,
    icon: <FaUserTie size={36} />,
    title: "Guided Tours",
    desc: "Connect with verified local guides who bring destinations to life through stories and culture.",
    link: "/guides",
    external: false,
  },
];

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    if (service.external) {
      window.open(service.link, "_blank", "noopener,noreferrer");
    } else {
      navigate(service.link);
    }
  };

  return (
    <section
      id="services"
      className="bg-gradient-to-b from-white via-orange-50 to-white pt-16 pb-12 px-6 md:px-12 scroll-mt-20 border-t-4 border-green-400"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
          Assistance Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-sm md:text-base">
          From safety to comfort — access all essential travel services with ease and confidence.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-orange-400 shadow-sm hover:shadow-md p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

import React from "react";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NearbyHospitals = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-16 px-6 md:px-12 border-t-4 border-green-400">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-orange-600 hover:underline mb-6 font-semibold"
      >
        <FaArrowLeft className="mr-2" /> Back to Services
      </button>

      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Nearby Hospitals
        </h1>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Find nearby hospitals, clinics, and emergency centers around Maharashtra using
          the live Google Map below.
        </p>

        {/* 🏥 Google Maps Embed — Corrected */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            title="Nearby Hospitals"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1512112.8291785012!2d72.5!3d19.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8fdc4e9a35f%3A0x8aaf7a0eb4e31e57!2sMaharashtra!5e0!3m2!1sen!2sin!4v1711180712394!5m2!1sen!2sin"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* 🌐 Open in Google Maps */}
        <div className="mt-6">
  <button
    onClick={() =>
      window.open(
        "https://www.google.com/maps/search/hospitals+near+Maharashtra/",
        "_blank",
        "noopener,noreferrer"
      )
    }
    className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-orange-600 transition-all duration-200"
  >
    View Full Map <FaExternalLinkAlt className="text-sm" />
  </button>
</div>


        <p className="text-gray-700 mt-8 leading-relaxed">
          You can click “View Full Map” to open Google Maps in a new tab for better
          navigation, directions, and real-time hospital listings near your current
          location.
        </p>
      </div>
    </div>
  );
};

export default NearbyHospitals;

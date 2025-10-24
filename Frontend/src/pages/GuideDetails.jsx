import React from "react";
import { FaArrowLeft, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const guides = [
  {
    id: 1,
    name: "Omkar Gupta",
    photo:
      "https://randomuser.me/api/portraits/men/40.jpg",
    contact: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
  },
  {
    id: 2,
    name: "Dinesh Bishokarma",
    photo:
      "https://randomuser.me/api/portraits/men/50.jpg",
    contact: "+91 91234 56789",
    location: "Pune, Maharashtra",
  },
];

const GuideDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-16 px-6 md:px-12 border-t-4 border-green-400">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-orange-600 hover:underline mb-8 font-semibold"
      >
        <FaArrowLeft className="mr-2" /> Back to Services
      </button>

      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
          Our Verified Tour Guides
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Meet our trusted local guides — passionate storytellers ready to make your journey memorable across Maharashtra.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 border border-gray-200 hover:border-orange-400"
            >
              <img
                src={guide.photo}
                alt={guide.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-orange-300"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {guide.name}
              </h3>
              <p className="flex items-center justify-center text-gray-600 mb-1">
                <FaPhoneAlt className="text-orange-500 mr-2" /> {guide.contact}
              </p>
              <p className="flex items-center justify-center text-gray-600">
                <FaMapMarkerAlt className="text-orange-500 mr-2" /> {guide.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuideDetails;

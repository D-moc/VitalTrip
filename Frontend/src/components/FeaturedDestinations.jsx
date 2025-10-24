import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/destinations"); // ✅ your backend API
        setDestinations(res.data.slice(0, 6)); // show top 6 featured
      } catch (err) {
        console.error("Error fetching destinations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-emerald-50 to-cyan-50" id="destinations">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Featured <span className="text-emerald-600">Destinations</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Discover the best spots to visit across Maharashtra — forts, beaches, waterfalls, and more.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest._id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
            >
              {/* Image */}
              <img
                src={dest.image || "https://source.unsplash.com/800x500/?travel,maharashtra"}
                alt={dest.name}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80"></div>

              {/* Content Overlay */}
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-xl font-bold mb-1 drop-shadow-lg">{dest.name}</h3>
                <p className="text-sm text-gray-200 line-clamp-2 max-w-xs">{dest.description}</p>
                <span className="mt-2 inline-block bg-emerald-600/80 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                  {dest.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Link
            to="/destinations"
            className="px-8 py-3 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 hover:shadow-[0_4px_20px_rgba(16,185,129,0.5)] transition-all duration-300"
          >
            View All Destinations →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;



import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaCalendarAlt,
} from "react-icons/fa";
import api from "../utils/api";

// import gateway from "../assets/gateway.jpg";
import thoseghar from "../assets/thoseghar.jpg";
// import fort from "../assets/tornafort.jpg";

import fortsImg from "../assets/destinations/forts.png";
import beachesImg from "../assets/destinations/beaches.jpg";
import waterfallsImg from "../assets/destinations/waterfalls.jpg";
import templesImg from "../assets/destinations/temples.jpg";
import lakesImg from "../assets/destinations/lakes.jpg";

const categories = [
  { title: "Historic Forts", count: "50+", image: fortsImg, tag: "fort" },
  { title: "Serene Beaches", count: "30+", image: beachesImg, tag: "beach" },
  {
    title: "Majestic Waterfalls",
    count: "40+",
    image: waterfallsImg,
    tag: "waterfall",
  },
  { title: "Sacred Temples", count: "60+", image: templesImg, tag: "temple" },
  { title: "Beautiful Lakes", count: "25+", image: lakesImg, tag: "lake" },
];

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Use local scenic images
  const images = [thoseghar];

  const [currentImage, setCurrentImage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  // Fetch destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await api.get("/destinations");
        setDestinations(res.data.destinations || []);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      }
    };
    fetchDestinations();
  }, []);

  // slideshow
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentImage((prev) => (prev + 1) % images.length),
      6000
    );
    return () => clearInterval(interval);
  }, []);

  // scroll if navigation passed state.scrollTo
  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      // small timeout to allow Home to render
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        // clear history state so back/refresh doesn't repeat scroll
        window.history.replaceState({ ...window.history.state, usr: null }, "");
      }, 120);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  // search suggestions
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredResults([]);
      return;
    }
    const filteredLocal = destinations.filter((d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResults(filteredLocal.slice(0, 7));
  }, [searchQuery, destinations]);

  const handleSearch = (e) => {
    e.preventDefault();
    const match = destinations.find(
      (d) => d.name.toLowerCase() === searchQuery.toLowerCase()
    );
    if (match) {
      // NAVIGATE to match page (updated to match App route /destination/:id)
      navigate(`/destination/${match._id}`, {
        state: { name: match.name, destinationId: match._id },
      });
    } else {
      alert("No destination found!");
      setFilteredResults([]);
      setShowSuggestions(false);
    }
  };

  const filterByCategory = (tag) => {
    setActiveCategory(tag);
    const filteredList = destinations.filter((d) =>
      d.category?.toLowerCase().includes(tag)
    );
    setFiltered(filteredList);
    // scroll into view (if user clicked category from somewhere else)
    setTimeout(() => {
      const el = document.getElementById("destinations");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const resetCategories = () => {
    setActiveCategory(null);
    setFiltered([]);
  };

  return (
    <>
      {/* HERO */}
      <section
        id="home"
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-[1500ms]"
          style={{
            backgroundImage: `url(${images[currentImage]})`,
            filter: "brightness(0.45)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 z-[1]" />

        <div className="relative z-[2] text-center px-6 md:px-12 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl">
            Discover <span className="text-orange-400">Maharashtra</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-yellow-500 to-teal-400 text-transparent bg-clip-text">
              Like Never Before
            </span>
          </h1>

          <p className="mt-5 text-lg md:text-xl text-gray-200 font-medium drop-shadow-md">
            Search forts, caves, beaches and more — all waiting to be explored.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mt-10 w-full max-w-lg mx-auto relative"
          >
            <div className="flex items-center bg-white/20 backdrop-blur-md rounded-2xl overflow-hidden border border-white/30 shadow-lg focus-within:ring-2 focus-within:ring-orange-400 transition">
              <FaSearch className="text-white text-lg ml-4 mr-2" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                className="w-full bg-transparent text-white placeholder-gray-300 focus:outline-none py-3 pr-3 text-base"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-teal-500 text-white font-semibold px-5 py-3 rounded-none hover:opacity-90 transition-all"
              >
                Search
              </button>
            </div>

            {showSuggestions && filteredResults.length > 0 && (
              <ul className="absolute left-0 right-0 mt-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-gray-200 max-h-60 overflow-y-auto z-50">
                {filteredResults.map((dest) => (
                  <li
                    key={dest._id}
                    onClick={() => {
                      // NAVIGATE to destination detail
                      navigate(`/destination/${dest._id}`);
                      setShowSuggestions(false);
                      setSearchQuery("");
                    }}
                    className="px-4 py-3 text-gray-800 font-medium cursor-pointer hover:bg-orange-100 transition"
                  >
                    {dest.name}
                  </li>
                ))}
              </ul>
            )}
          </form>

          <div className="mt-12">
            <button
              onClick={() => navigate("/plan-trip")}
              className="px-10 py-4 bg-gradient-to-r from-orange-500 to-teal-500 text-white text-lg font-semibold rounded-2xl shadow-lg hover:scale-105 transition-transform"
            >
              Plan Your Trip
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 to-transparent" />
      </section>
    </>
  );
};

export default Home;

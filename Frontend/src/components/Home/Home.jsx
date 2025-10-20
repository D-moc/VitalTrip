// //1

// import React, { useState } from "react";
// import "./Home.css";
// import { FaSearch, FaMapMarkerAlt, FaClock, FaRupeeSign } from "react-icons/fa";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const API_BASE = "http://localhost:4000/api/destinations";

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setError("");
//     setResults([]);

//     if (!searchQuery.trim()) {
//       setError("Please enter a destination name.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `${API_BASE}/search?q=${encodeURIComponent(searchQuery)}`
//       );
//       const data = await response.json();
//       if (response.ok) setResults(data.results);
//       else setError(data.message || "No destinations found.");
//     } catch (err) {
//       setError("Server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openDestinationPage = (id) => navigate(`/destination/${id}`);

//   return (
//     <section id="home" className="home">
//       <ToastContainer />
//       <div className="overlay"></div>

//       <div className="home-container">
//         <h1 className="home-title">DISCOVER HIDDEN GEMS AND LOCAL SECRETS</h1>
//         <p className="home-subtitle">
//           <i>Plan your trips, explore destinations, and travel smarter with VitalTrip.</i>
//         </p>

//         {/* 🔍 Search Bar */}
//         <form className="search-bar" onSubmit={handleSearch}>
//           <input
//             type="text"
//             placeholder="Search destinations (e.g. Torna Fort, Kaas Plateau)..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button type="submit" className="search-btn">
//             <FaSearch />
//           </button>
//         </form>

//         {loading && <p className="status-text">Searching destinations...</p>}
//         {error && <p className="error-text">{error}</p>}

//         {/* 🗺️ Results */}
//         {results.length > 0 && (
//           <div className="results-container">
//             {results.map((place) => (
//               <div
//                 key={place._id}
//                 className="destination-card text-only"
//                 onClick={() => openDestinationPage(place._id)}
//               >
//                 <div className="destination-info">
//                   <h3 className="destination-name">{place.name}</h3>
//                   <p className="destination-location">
//                     <FaMapMarkerAlt /> {place.location}
//                   </p>
//                   <p className="destination-desc">
//                     {place.description.length > 140
//                       ? place.description.slice(0, 140) + "..."
//                       : place.description}
//                   </p>
//                   <div className="destination-meta">
//                     <span>
//                       <FaClock /> {place.bestTimeToVisit}
//                     </span>
//                     <span>
//                       <FaRupeeSign /> {place.budget}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ✈️ Plan Trip Button */}
//         <button className="plan-btn" onClick={() => navigate("/plan-trip")}>
//           Plan Your Trip
//         </button>
//       </div>
//     </section>
//   );
// }

// export default Home;


import React, { useState } from "react";
import "./Home.css";
import { FaSearch, FaMapMarkerAlt, FaClock, FaRupeeSign } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_BASE = "http://localhost:4000/api/destinations";

  const handleSearch = async (e) => {
    e.preventDefault();
    setResults([]);

    if (!searchQuery.trim()) {
      toast.warn("Please enter a destination name..", {
        position: "top-center",
        autoClose: 500,
        theme: "colored",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE}/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      if (response.ok && data.results.length > 0) {
        setResults(data.results);
      } else {
        toast.error("No destinations found 😔", {
          position: "top-center",
          autoClose: 500,
          theme: "colored",
        });
      }
    } catch (err) {
      toast.error("Server error! Please try again later ⚠️", {
        position: "top-center",
        autoClose: 500,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const openDestinationPage = (id) => navigate(`/destination/${id}`);

  return (
    <section id="home" className="home">
      <ToastContainer />
      <div className="overlay"></div>

      <div className="home-container">
        <h1 className="home-title">DISCOVER HIDDEN GEMS AND LOCAL SECRETS</h1>
        <p className="home-subtitle">
          <i>
            Plan your trips, explore destinations, and travel smarter with{" "}
            <b>VitalTrip</b>.
          </i>
        </p>

        {/* 🔍 Search Bar */}
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search destinations (e.g., Torna Fort, Kaas Plateau)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <FaSearch />
          </button>
        </form>

        {loading && <p className="status-text">Searching destinations...</p>}

        {/* 🗺️ Results */}
        {results.length > 0 && (
          <div className="results-container">
            {results.map((place) => (
              <div
                key={place._id}
                className="destination-card text-only"
                onClick={() => openDestinationPage(place._id)}
              >
                <div className="destination-info">
                  <h3 className="destination-name">{place.name}</h3>
                  <p className="destination-location">
                    <FaMapMarkerAlt /> {place.location}
                  </p>
                  <p className="destination-desc">
                    {place.description.length > 140
                      ? place.description.slice(0, 140) + "..."
                      : place.description}
                  </p>
                  <div className="destination-meta">
                    <span>
                      <FaClock /> {place.bestTimeToVisit}
                    </span>
                    <span>
                      <FaRupeeSign /> {place.budget}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✈️ Plan Trip Button */}
        <button className="plan-btn" onClick={() => navigate("/plan-trip")}>
          Plan Your Trip
        </button>
      </div>
    </section>
  );
}

export default Home;

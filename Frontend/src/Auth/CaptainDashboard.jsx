// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./CaptainDashboard.css";

// function CaptainDashboard() {
//   const [captain, setCaptain] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       navigate("/captain-login");
//       return;
//     }

//     fetch("/captains/profile", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => setCaptain(data.captain))
//       .catch(() => navigate("/captain-login"));
//   }, [navigate]);

//   const handleLogout = async () => {
//     const token = localStorage.getItem("authToken");
//     await fetch("/captains/logout", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <div className="captain-dashboard">
//       <div className="dashboard-container">
//         <header className="dashboard-header">
//           <h1>
//             Welcome, <span>{captain?.fullname?.firstname || "Captain"}</span> 🚘
//           </h1>
//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </header>

//         <section className="dashboard-content">
//           <div className="dashboard-card">
//             <h3>Your Profile</h3>
//             <p><strong>Name:</strong> {captain?.fullname?.firstname} {captain?.fullname?.lastname}</p>
//             <p><strong>Email:</strong> {captain?.email}</p>
//           </div>

//           <div className="dashboard-card">
//             <h3>Trip Management</h3>
//             <p>View and manage your assigned trips here (coming soon).</p>
//           </div>

//           <div className="dashboard-card">
//             <h3>Messages</h3>
//             <p>Stay connected with your clients (feature in progress).</p>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default CaptainDashboard;


import React, { useEffect, useState } from "react";
import api from "../utils/api";
import "./CaptainDashboard.css";
import { useNavigate } from "react-router-dom";

function CaptainDashboard() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    bestTimeToVisit: "",
    budget: "",
  });

  const navigate = useNavigate();

  // ✅ Fetch all destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await api.get("/destinations/search?q=");
        setDestinations(res.data.results || []);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // ✅ Handle Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add / Edit Destination
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formMode === "add") {
        await api.post("/destinations/add", formData);
        alert("Destination added successfully!");
      } else {
        await api.post("/destinations/add", {
          ...formData,
          _id: selectedDestination._id,
        });
        alert("Destination updated successfully!");
      }
      window.location.reload();
    } catch (err) {
      console.error("Error saving destination:", err);
      alert("Error saving destination!");
    }
  };

  // ✅ Edit Destination
  const handleEdit = (destination) => {
    setFormMode("edit");
    setSelectedDestination(destination);
    setFormData({
      name: destination.name,
      location: destination.location,
      description: destination.description,
      bestTimeToVisit: destination.bestTimeToVisit,
      budget: destination.budget,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete Destination
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this destination?")) return;
    try {
      await api.delete(`/destinations/${id}`);
      alert("Destination deleted successfully!");
      setDestinations(destinations.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Error deleting destination:", err);
      alert("Error deleting destination!");
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await api.get("/captains/logout");
      localStorage.clear();
      navigate("/");
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <section className="captain-dashboard">
      <div className="captain-header">
        <h1>🧭 Captain Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>

      <div className="destination-form">
        <h2>{formMode === "add" ? "➕ Add New Destination" : "✏️ Edit Destination"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Destination Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="bestTimeToVisit"
            placeholder="Best Time to Visit"
            value={formData.bestTimeToVisit}
            onChange={handleChange}
          />
          <input
            type="text"
            name="budget"
            placeholder="Budget"
            value={formData.budget}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="submit-btn">
            {formMode === "add" ? "Add Destination" : "Update Destination"}
          </button>
        </form>
      </div>

      <div className="destination-list">
        <h2>📍 All Destinations</h2>
        {loading ? (
          <p>Loading destinations...</p>
        ) : destinations.length === 0 ? (
          <p>No destinations found.</p>
        ) : (
          <div className="destination-grid">
            {destinations.map((dest) => (
              <div key={dest._id} className="destination-card">
                <h3>{dest.name}</h3>
                <p><strong>📍 Location:</strong> {dest.location}</p>
                <p><strong>🕓 Best Time:</strong> {dest.bestTimeToVisit}</p>
                <p><strong>💰 Budget:</strong> {dest.budget}</p>
                <p className="desc">{dest.description}</p>

                <div className="card-actions">
                  <button onClick={() => handleEdit(dest)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(dest._id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default CaptainDashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaCamera } from "react-icons/fa";
// import api from "../utils/api";
// import "./UserDashboard.css";

// function UserDashboard() {
//   const [user, setUser] = useState(null);
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [preview, setPreview] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [tripsPerPage] = useState(4);

//   const navigate = useNavigate();

//   // ✅ Fetch user profile + trips
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const profileRes = await api.get("/users/profile");
//         const tripsRes = await api.get("/trips/my-trips");

//         const userData = profileRes.data.user;
//         setUser(userData);
//         setTrips(tripsRes.data.trips || []);

//         // ✅ Save profile info to localStorage (for Navbar persistence)
//         if (userData) {
//           localStorage.setItem(
//             "userName",
//             userData.fullname?.firstname || "User"
//           );
//           if (userData.profileImage) {
//             localStorage.setItem("userImage", userData.profileImage);
//           }
//           window.dispatchEvent(new Event("storage"));
//         }
//       } catch (err) {
//         console.error("Error loading dashboard:", err);
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserData();
//   }, [navigate]);

//   // ✅ Upload new profile image with preview
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Show preview instantly
//     const previewURL = URL.createObjectURL(file);
//     setPreview(previewURL);

//     const formData = new FormData();
//     formData.append("profileImage", file);

//     try {
//       setUploading(true);
//       const res = await api.post("/users/upload-profile", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const newImageUrl = res.data.imageUrl;
//       setUser((prev) => ({ ...prev, profileImage: newImageUrl }));

//       // ✅ Update Navbar instantly
//       localStorage.setItem("userImage", newImageUrl);
//       window.dispatchEvent(new Event("storage"));
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Failed to upload profile image");
//     } finally {
//       setUploading(false);
//       URL.revokeObjectURL(preview);
//     }
//   };

//   // ✅ Back to Home
//   const handleBackHome = () => {
//     window.dispatchEvent(new Event("storage"));
//     navigate("/");
//   };

//   // ✅ Pagination logic
//   const indexOfLastTrip = currentPage * tripsPerPage;
//   const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
//   const currentTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);
//   const totalPages = Math.ceil(trips.length / tripsPerPage);

//   const nextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };
//   const prevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   if (loading) {
//     return (
//       <div className="userdashboard-loading">
//         <h3>Loading your dashboard...</h3>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="userdashboard-error">
//         <h3>Unable to load user data.</h3>
//         <button onClick={() => navigate("/login")}>Go to Login</button>
//       </div>
//     );
//   }

//   return (
//     <section className="userdashboard-page">
//       {/* ---------- HEADER ---------- */}
//       <div className="userdashboard-header">
//         <h1>👋 Welcome, {user.fullname?.firstname}!</h1>
//         <button className="back-btn" onClick={handleBackHome}>
//           ⬅ Back to Home
//         </button>
//       </div>

//       {/* ---------- PROFILE CARD ---------- */}
//       <div className="profile-card">
//         <div className="profile-image-container">
//           <img
//             src={
//               preview
//                 ? preview
//                 : user.profileImage
//                 ? user.profileImage.startsWith("http")
//                   ? user.profileImage
//                   : `http://localhost:5000/${user.profileImage}`
//                 : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//             }
//             alt="Profile"
//             className="profile-image"
//           />

//           <label htmlFor="imageUpload" className="camera-icon">
//             <FaCamera />
//             <input
//               id="imageUpload"
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               hidden
//             />
//           </label>
//           {uploading && <p className="uploading-text">Uploading...</p>}
//         </div>

//         <h2>
//           {user.fullname?.firstname + " " + (user.fullname?.lastname || "")}
//         </h2>
//         <p className="email-text">{user.email}</p>
//       </div>

//       {/* ---------- TRIPS ---------- */}
//       <div className="trip-history">
//         <h2>🧳 Your Trips</h2>

//         {trips.length === 0 ? (
//           <p className="no-trips">No trips found.</p>
//         ) : (
//           <>
//             <div className="trip-grid">
//               {currentTrips.map((trip) => (
//                 <div key={trip._id} className="trip-card">
//                   <h3>🏙️ {trip.destination}</h3>
//                   <p>
//                     <strong>Days:</strong> {trip.days}
//                   </p>
//                   <p>
//                     <strong>Travellers:</strong> {trip.travellers}
//                   </p>
//                   <p>
//                     <strong>Budget:</strong> ₹{trip.budget}
//                   </p>
//                   <p>
//                     <strong>Transport:</strong> {trip.transport}
//                   </p>
//                   <p>
//                     <strong>Stay:</strong> {trip.stay}
//                   </p>
//                   {trip.itinerary && (
//                     <p>
//                       <strong>Interests:</strong> {trip.itinerary}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* ---------- PAGINATION ---------- */}
//             {totalPages > 1 && (
//               <div className="pagination">
//                 <button
//                   onClick={prevPage}
//                   disabled={currentPage === 1}
//                   className="arrow-btn"
//                 >
//                   ◀
//                 </button>
//                 <span className="page-info">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   onClick={nextPage}
//                   disabled={currentPage === totalPages}
//                   className="arrow-btn"
//                 >
//                   ▶
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </section>
//   );
// }

// export default UserDashboard;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import api from "../utils/api";
import "./UserDashboard.css";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tripsPerPage] = useState(4);

  const navigate = useNavigate();

  // ✅ Use backend URL from .env (for image URLs)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // ✅ Fetch user profile + trips
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileRes = await api.get("/users/profile");
        const tripsRes = await api.get("/trips/my-trips");

        const userData = profileRes.data.user;
        setUser(userData);
        setTrips(tripsRes.data.trips || []);

        // ✅ Save profile info for Navbar sync
        if (userData) {
          localStorage.setItem("userName", userData.fullname?.firstname || "User");

          if (userData.profileImage) {
            const imageUrl = `${BACKEND_URL}/${userData.profileImage.replace(/^\/+/, "")}`;
            localStorage.setItem("userImage", imageUrl);
          }

          window.dispatchEvent(new Event("storage"));
        }
      } catch (err) {
        console.error("Error loading dashboard:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, BACKEND_URL]);

  // // ✅ Upload new profile image
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const previewURL = URL.createObjectURL(file);
  //   setPreview(previewURL);

  //   const formData = new FormData();
  //   formData.append("profileImage", file);

  //   try {
  //     setUploading(true);
  //     const res = await api.post("/users/upload-profile", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     const newImageUrl = `${BACKEND_URL}/${res.data.imageUrl.replace(/^\/+/, "")}`;
  //     setUser((prev) => ({ ...prev, profileImage: newImageUrl }));

  //     // ✅ Update Navbar instantly
  //     localStorage.setItem("userImage", newImageUrl);
  //     window.dispatchEvent(new Event("storage"));
  //   } catch (err) {
  //     console.error("Upload failed:", err);
  //     alert("Failed to upload profile image");
  //   } finally {
  //     setUploading(false);
  //     URL.revokeObjectURL(preview);
  //   }
  // };

  // ✅ Upload new profile image
const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const previewURL = URL.createObjectURL(file);
  setPreview(previewURL);

  const formData = new FormData();
  formData.append("profileImage", file);

  try {
    setUploading(true);
    const res = await api.post("/users/upload-profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // ✅ Check backend response correctly
    if (res.data?.success && res.data.imageUrl) {
      const newImageUrl = `${BACKEND_URL}/${res.data.imageUrl.replace(/^\/+/, "")}`;
      setUser((prev) => ({ ...prev, profileImage: newImageUrl }));

      // ✅ Update Navbar instantly
      localStorage.setItem("userImage", newImageUrl);
      window.dispatchEvent(new Event("storage"));
    } else {
      console.error("Unexpected response:", res.data);
      alert("Unexpected server response while uploading image");
    }
  } catch (err) {
    console.error("Upload failed:", err.response?.data || err.message);
    alert("Failed to upload profile image");
  } finally {
    setUploading(false);
    URL.revokeObjectURL(preview);
  }
};


  // ✅ Back to Home
  const handleBackHome = () => {
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  // ✅ Pagination logic
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);
  const totalPages = Math.ceil(trips.length / tripsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <div className="userdashboard-loading">
        <h3>Loading your dashboard...</h3>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="userdashboard-error">
        <h3>Unable to load user data.</h3>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <section className="userdashboard-page">
      {/* ---------- HEADER ---------- */}
      <div className="userdashboard-header">
        <h1>👋 Welcome, {user.fullname?.firstname}!</h1>
        <button className="back-btn" onClick={handleBackHome}>
          ⬅ Back to Home
        </button>
      </div>

      {/* ---------- PROFILE CARD ---------- */}
      <div className="profile-card">
        <div className="profile-image-container">
          <img
            src={
              preview
                ? preview
                : user.profileImage
                ? user.profileImage.startsWith("http")
                  ? user.profileImage
                  : `${BACKEND_URL}/${user.profileImage.replace(/^\/+/, "")}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="profile-image"
            onError={(e) =>
              (e.target.src =
                "https://cdn-icons-png.flaticon.com/512/149/149071.png")
            }
          />
          <label htmlFor="imageUpload" className="camera-icon">
            <FaCamera />
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
          </label>
          {uploading && <p className="uploading-text">Uploading...</p>}
        </div>

        <h2>
          {user.fullname?.firstname + " " + (user.fullname?.lastname || "")}
        </h2>
        <p className="email-text">{user.email}</p>
      </div>

      {/* ---------- TRIPS ---------- */}
      <div className="trip-history">
        <h2>🧳 Your Trips</h2>

        {trips.length === 0 ? (
          <p className="no-trips">No trips found.</p>
        ) : (
          <>
            <div className="trip-grid">
              {currentTrips.map((trip) => (
                <div key={trip._id} className="trip-card">
                  <h3>🏙️ {trip.destination}</h3>
                  <p><strong>Days:</strong> {trip.days}</p>
                  <p><strong>Travellers:</strong> {trip.travellers}</p>
                  <p><strong>Budget:</strong> ₹{trip.budget}</p>
                  <p><strong>Transport:</strong> {trip.transport}</p>
                  <p><strong>Stay:</strong> {trip.stay}</p>
                  {trip.itinerary && (
                    <p><strong>Interests:</strong> {trip.itinerary}</p>
                  )}
                </div>
              ))}
            </div>

            {/* ---------- PAGINATION ---------- */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="arrow-btn"
                >
                  ◀
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="arrow-btn"
                >
                  ▶
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default UserDashboard;

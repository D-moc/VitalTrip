// import React, { useState, useEffect, useRef } from "react";
// import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
// import { useLocation, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
// import "./Navbar.css";

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const signupRef = useRef(null);

//   // ✅ Update role whenever authToken or location changes
//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const token = localStorage.getItem("authToken");
//       const role = localStorage.getItem("role");
//       setUserRole(token ? role : null);
//     };

//     checkLoginStatus();
//     window.addEventListener("storage", checkLoginStatus);
//     return () => window.removeEventListener("storage", checkLoginStatus);
//   }, [location]);

//   // ✅ Close signup dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (signupRef.current && !signupRef.current.contains(event.target)) {
//         setIsSignupDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ✅ Smooth navigation
//   const handleNavClick = (e, id) => {
//     e.preventDefault();
//     if (location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         const section = document.querySelector(id);
//         if (section) section.scrollIntoView({ behavior: "smooth" });
//       }, 300);
//     } else {
//       const section = document.querySelector(id);
//       if (section) section.scrollIntoView({ behavior: "smooth" });
//     }
//     setIsMenuOpen(false);
//   };

//   // ✅ Logout function
//   const handleSignOut = async () => {
//     const token = localStorage.getItem("authToken");
//     const role = localStorage.getItem("role");
//     const endpoint = role === "captain" ? "/captains/logout" : "/users/logout";

//     try {
//       await fetch(endpoint, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     } catch (error) {
//       console.error("Logout error:", error);
//     }

//     localStorage.clear();
//     setUserRole(null);
//     setIsDropdownOpen(false);
//     navigate("/");
//     window.dispatchEvent(new Event("storage"));
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         {/* ---------- LOGO ---------- */}
//         <div className="nav-logo" onClick={() => navigate("/")}>
//           <img src={logo} alt="logo" className="logo-img" />
//           <span className="logo-text">VitalTrip</span>
//         </div>

//         {/* ---------- NAV LINKS ---------- */}
//         <ul className="nav-links desktop">
//           <li>
//             <a href="#home" onClick={(e) => handleNavClick(e, "#home")}>
//               Home
//             </a>
//           </li>
//           <li>
//             <a href="#explore" onClick={(e) => handleNavClick(e, "#explore")}>
//               Explore
//             </a>
//           </li>
//           <li>
//             <a href="#services" onClick={(e) => handleNavClick(e, "#services")}>
//               Services
//             </a>
//           </li>
//           <li>
//             <a href="#blogs" onClick={(e) => handleNavClick(e, "#blogs")}>
//               Blogs
//             </a>
//           </li>
//         </ul>

//         {/* ---------- RIGHT SIDE (Sign Up / Profile) ---------- */}
//         <div className="nav-actions desktop">
//           {!userRole ? (
//             <div className="signup-menu" ref={signupRef}>
//               <button
//                 className="btn signup-btn"
//                 onClick={() =>
//                   setIsSignupDropdownOpen(!isSignupDropdownOpen)
//                 }
//               >
//                 Sign Up
//               </button>
//               {isSignupDropdownOpen && (
//                 <div className="signup-dropdown">
//                   <button onClick={() => navigate("/signup")}>
//                     As User
//                   </button>
//                   <button onClick={() => navigate("/captain-signup")}>
//                     As Admin
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div
//               className="profile-menu"
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             >
//               <div className="profile-icon">
//                 <FaUserCircle size={27} />
//                 <span className="profile-name">
//                   {userRole === "captain" ? "Captain" : "My Profile"}
//                 </span>
//               </div>
//               {isDropdownOpen && (
//                 <div className="profile-modal">
//                   {userRole === "captain" ? (
//                     <>
//                       <button onClick={() => navigate("/captain-dashboard")}>
//                         Dashboard
//                       </button>
//                       <button onClick={handleSignOut}>Sign Out</button>
//                     </>
//                   ) : (
//                     <>
//                       <button onClick={() => navigate("/your-trips")}>
//                         Your Trips
//                       </button>
//                       <button onClick={() => navigate("/reviews")}>
//                         Reviews
//                       </button>
//                       <button onClick={handleSignOut}>Sign Out</button>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* ---------- MOBILE MENU TOGGLE ---------- */}
//         <div className="menu-toggle" onClick={() => setIsMenuOpen(true)}>
//           <FaBars />
//         </div>
//       </div>

//       {/* ---------- MOBILE MENU OVERLAY ---------- */}
//       {isMenuOpen && (
//         <div className="menu-overlay">
//           <div className="menu-content">
//             <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
//               <FaTimes />
//             </button>

//             <ul>
//               <li>
//                 <a href="#home" onClick={(e) => handleNavClick(e, "#home")}>
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#explore"
//                   onClick={(e) => handleNavClick(e, "#explore")}
//                 >
//                   Explore
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#services"
//                   onClick={(e) => handleNavClick(e, "#services")}
//                 >
//                   Services
//                 </a>
//               </li>
//               <li>
//                 <a href="#blogs" onClick={(e) => handleNavClick(e, "#blogs")}>
//                   Blogs
//                 </a>
//               </li>
//             </ul>

//             <div className="menu-actions">
//               {!userRole ? (
//                 <div className="mobile-signup">
//                   <button onClick={() => navigate("/signup")}>
//                     User Sign Up
//                   </button>
//                   <button onClick={() => navigate("/captain-signup")}>
//                     Admin Sign Up
//                   </button>
//                 </div>
//               ) : (
//                 <div className="mobile-signup">
//                   {userRole === "captain" ? (
//                     <>
//                       <button
//                         onClick={() => navigate("/captain-dashboard")}
//                       >
//                         Dashboard
//                       </button>
//                       <button onClick={handleSignOut}>Sign Out</button>
//                     </>
//                   ) : (
//                     <>
//                       <button onClick={() => navigate("/your-trips")}>
//                         Your Trips
//                       </button>
//                       <button onClick={() => navigate("/reviews")}>
//                         Reviews
//                       </button>
//                       <button onClick={handleSignOut}>Sign Out</button>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;

//perfect 1st
// import React, { useState, useEffect, useRef } from "react";
// import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
// import { useLocation, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
// import "./Navbar.css";

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const signupRef = useRef(null);

//   // ✅ Update role whenever authToken or location changes
//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const token = localStorage.getItem("authToken");
//       const role = localStorage.getItem("role");
//       setUserRole(token ? role : null);
//     };

//     checkLoginStatus();
//     window.addEventListener("storage", checkLoginStatus);
//     return () => window.removeEventListener("storage", checkLoginStatus);
//   }, [location]);

//   // ✅ Close signup dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (signupRef.current && !signupRef.current.contains(event.target)) {
//         setIsSignupDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ✅ Close mobile menu on resize (prevents stuck open)
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 900) setIsMenuOpen(false);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleNavClick = (e, id) => {
//     e.preventDefault();
//     if (location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         const section = document.querySelector(id);
//         if (section) section.scrollIntoView({ behavior: "smooth" });
//       }, 300);
//     } else {
//       const section = document.querySelector(id);
//       if (section) section.scrollIntoView({ behavior: "smooth" });
//     }
//     setIsMenuOpen(false);
//   };

//   const handleSignOut = async () => {
//     const token = localStorage.getItem("authToken");
//     const role = localStorage.getItem("role");
//     const endpoint = role === "captain" ? "/captains/logout" : "/users/logout";

//     try {
//       await fetch(endpoint, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     } catch (error) {
//       console.error("Logout error:", error);
//     }

//     localStorage.clear();
//     setUserRole(null);
//     setIsDropdownOpen(false);
//     navigate("/");
//     window.dispatchEvent(new Event("storage"));
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         {/* ---------- LOGO ---------- */}
//         <div className="nav-logo" onClick={() => navigate("/")}>
//           <img src={logo} alt="logo" className="logo-img" />
//           <span className="logo-text">VitalTrip</span>
//         </div>

//         {/* ---------- NAV LINKS ---------- */}
//         <ul className="nav-links desktop">
//           <li><a href="#home" onClick={(e) => handleNavClick(e, "#home")}>Home</a></li>
//           <li><a href="#explore" onClick={(e) => handleNavClick(e, "#explore")}>Explore</a></li>
//           <li><a href="#services" onClick={(e) => handleNavClick(e, "#services")}>Services</a></li>
//           <li><a href="#blogs" onClick={(e) => handleNavClick(e, "#blogs")}>Blogs</a></li>
//         </ul>

//         {/* ---------- RIGHT SIDE ---------- */}
//         <div className="nav-actions desktop">
//           {!userRole ? (
//             <div className="signup-menu" ref={signupRef}>
//               <button
//                 className="btn signup-btn"
//                 onClick={() => setIsSignupDropdownOpen(!isSignupDropdownOpen)}
//               >
//                 Sign Up
//               </button>
//               {isSignupDropdownOpen && (
//                 <div className="signup-dropdown">
//                   <button onClick={() => navigate("/signup")}>As User</button>
//                   <button onClick={() => navigate("/captain-signup")}>As Admin</button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div
//               className="profile-menu"
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             >
//               <div className="profile-icon">
//                 <FaUserCircle size={27} />
//                 <span className="profile-name">
//                   {userRole === "captain" ? "Captain" : "My Profile"}
//                 </span>
//               </div>
//               {isDropdownOpen && (
//                 <div className="profile-modal">
//                   {userRole === "captain" ? (
//                     <>
//                       <button onClick={() => navigate("/captain-dashboard")}>Dashboard</button>
//                       <button onClick={handleSignOut}>Sign Out</button>
//                     </>
//                   ) : (
//                     <>
//                       <button onClick={() => navigate("/your-trips")}>Your Trips</button>
//                       <button onClick={() => navigate("/reviews")}>Reviews</button>
//                       <button onClick={handleSignOut}>Sign Out</button>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* ---------- MOBILE TOGGLE ---------- */}
//         <div className="menu-toggle" onClick={() => setIsMenuOpen(true)}>
//           <FaBars />
//         </div>
//       </div>

//       {/* ---------- MOBILE MENU ---------- */}
//       {isMenuOpen && (
//         <div className="menu-overlay">
//           <div className="menu-content">
//             <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
//               <FaTimes />
//             </button>

//             <ul>
//               <li><a href="#home" onClick={(e) => handleNavClick(e, "#home")}>Home</a></li>
//               <li><a href="#explore" onClick={(e) => handleNavClick(e, "#explore")}>Explore</a></li>
//               <li><a href="#services" onClick={(e) => handleNavClick(e, "#services")}>Services</a></li>
//               <li><a href="#blogs" onClick={(e) => handleNavClick(e, "#blogs")}>Blogs</a></li>
//             </ul>

//             {/* ✅ Only show one button based on login status */}
//             <div className="menu-actions">
//               {!userRole ? (
//                 <button
//                   className="mobile-main-btn"
//                   onClick={() => navigate("/signup")}
//                 >
//                   Sign Up
//                 </button>
//               ) : (
//                 <button
//                   className="mobile-main-btn signout"
//                   onClick={handleSignOut}
//                 >
//                   Sign Out
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;


import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const signupRef = useRef(null);
  const profileRef = useRef(null); // ✅ for closing profile dropdown

  // ✅ Update role whenever authToken or location changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken");
      const role = localStorage.getItem("role");
      setUserRole(token ? role : null);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, [location]);

  // ✅ Close signup dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (signupRef.current && !signupRef.current.contains(event.target)) {
        setIsSignupDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Smooth scroll navigation
  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.querySelector(id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const section = document.querySelector(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  // ✅ Logout handler
  const handleSignOut = async () => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");
    const endpoint = role === "captain" ? "/captains/logout" : "/users/logout";

    try {
      await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.clear();
    setUserRole(null);
    setIsDropdownOpen(false);
    navigate("/");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* ---------- LOGO ---------- */}
        <div className="nav-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className="logo-img" />
          <span className="logo-text">VitalTrip</span>
        </div>

        {/* ---------- NAV LINKS ---------- */}
        <ul className="nav-links desktop">
          <li>
            <a href="#home" onClick={(e) => handleNavClick(e, "#home")}>
              Home
            </a>
          </li>
          <li>
            <a href="#explore" onClick={(e) => handleNavClick(e, "#explore")}>
              Explore
            </a>
          </li>
          <li>
            <a href="#services" onClick={(e) => handleNavClick(e, "#services")}>
              Services
            </a>
          </li>
          <li>
            <a href="#blogs" onClick={(e) => handleNavClick(e, "#blogs")}>
              Blogs
            </a>
          </li>
        </ul>

        {/* ---------- RIGHT SIDE (Sign Up / Profile) ---------- */}
        <div className="nav-actions desktop">
          {!userRole ? (
            <div className="signup-menu" ref={signupRef}>
              <button
                className="btn signup-btn"
                onClick={() => setIsSignupDropdownOpen(!isSignupDropdownOpen)}
              >
                Sign Up
              </button>
              {isSignupDropdownOpen && (
                <div className="signup-dropdown">
                  <button onClick={() => navigate("/signup")}>As User</button>
                  <button onClick={() => navigate("/captain-signup")}>
                    As Admin
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              className="profile-menu"
              ref={profileRef} // ✅ Added ref for click outside
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="profile-icon">
                <FaUserCircle size={27} />
                <span className="profile-name">
                  {userRole === "captain" ? "Captain" : "My Profile"}
                </span>
              </div>
              {isDropdownOpen && (
                <div className="profile-modal">
                  {userRole === "captain" ? (
                    <>
                      <button onClick={() => navigate("/captain-dashboard")}>
                        Dashboard
                      </button>
                      <button onClick={handleSignOut}>Sign Out</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => navigate("/your-trips")}>
                        Your Trips
                      </button>
                      <button onClick={() => navigate("/reviews")}>
                        Reviews
                      </button>
                      <button onClick={handleSignOut}>Sign Out</button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ---------- MOBILE MENU TOGGLE ---------- */}
        <div className="menu-toggle" onClick={() => setIsMenuOpen(true)}>
          <FaBars />
        </div>
      </div>

      {/* ---------- MOBILE MENU OVERLAY ---------- */}
      {isMenuOpen && (
        <div className="menu-overlay">
          <div className="menu-content">
            <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
              <FaTimes />
            </button>

            <ul>
              <li>
                <a href="#home" onClick={(e) => handleNavClick(e, "#home")}>
                  Home
                </a>
              </li>
              <li>
                <a href="#explore" onClick={(e) => handleNavClick(e, "#explore")}>
                  Explore
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, "#services")}>
                  Services
                </a>
              </li>
              <li>
                <a href="#blogs" onClick={(e) => handleNavClick(e, "#blogs")}>
                  Blogs
                </a>
              </li>
            </ul>

            {/* ---------- MOBILE MENU ACTIONS ---------- */}
            <div className="menu-actions">
              {!userRole ? (
                <button
                  className="mobile-main-btn"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </button>
              ) : (
                <button
                  className="mobile-main-btn signout"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

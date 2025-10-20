import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import api from "../../utils/api";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState({ name: "", image: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const signupRef = useRef(null);
  const profileRef = useRef(null);

  // ✅ Base backend URL from .env (fallback to localhost:4000)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // ✅ Detect login, role, and fetch user info
  useEffect(() => {
    const updateLoginStatus = async () => {
      const token = localStorage.getItem("authToken");
      const role = localStorage.getItem("role");
      setUserRole(token ? role : null);

      if (token && role === "user") {
        try {
          const res = await api.get("/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.data?.user) {
            const profileImgUrl = res.data.user.profileImage
              ? `${BACKEND_URL}/${res.data.user.profileImage.replace(/^\/+/, "")}`
              : "";

            setUserData({
              name:
                res.data.user.fullname?.firstname +
                  " " +
                  (res.data.user.fullname?.lastname || "") || "User",
              image: profileImgUrl,
            });

            localStorage.setItem("userName", res.data.user.fullname?.firstname);
            if (res.data.user.profileImage)
              localStorage.setItem("userImage", profileImgUrl);
          }
        } catch (err) {
          console.error("Error fetching user info:", err);
        }
      } else if (token && role === "captain") {
        setUserData({ name: "Captain", image: "" });
      } else {
        setUserData({ name: "", image: "" });
      }
    };

    updateLoginStatus();
    window.addEventListener("storage", updateLoginStatus);
    return () => window.removeEventListener("storage", updateLoginStatus);
  }, [location]);

  // ✅ Sync image/name when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedImage = localStorage.getItem("userImage");
      const storedName = localStorage.getItem("userName");
      if (storedImage || storedName) {
        setUserData({
          name: storedName || "User",
          image: storedImage || "",
        });
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (signupRef.current && !signupRef.current.contains(e.target))
        setIsSignupDropdownOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Smooth scrolling
  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  // ✅ Logout
  const handleSignOut = async () => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");
    const endpoint =
      role === "captain"
        ? "/api/captains/logout"
        : "/api/users/logout";

    try {
      await api.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }

    localStorage.clear();
    setUserRole(null);
    setUserData({ name: "", image: "" });
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
          <li><a href="#home" onClick={(e) => handleNavClick(e, "#home")}>Home</a></li>
          <li><a href="#explore" onClick={(e) => handleNavClick(e, "#explore")}>Explore</a></li>
          <li><a href="#services" onClick={(e) => handleNavClick(e, "#services")}>Services</a></li>
          <li><a href="#blogs" onClick={(e) => handleNavClick(e, "#blogs")}>Blogs</a></li>
        </ul>

        {/* ---------- SIGNUP / PROFILE ---------- */}
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
                  <button onClick={() => navigate("/captain-signup")}>As Admin</button>
                </div>
              )}
            </div>
          ) : (
            <div
              className="profile-menu"
              ref={profileRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="profile-icon">
                {userData.image ? (
                  <img
                    src={
                      userData.image.startsWith("http")
                        ? userData.image
                        : `${BACKEND_URL}/uploads/${userData.image.replace(/^uploads[\\/]/, "")}`
                    }
                    alt="Profile"
                    className="navbar-profile-img"
                    onError={(e) => {
                      e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                    }}
                  />
                ) : (
                  <FaUserCircle size={27} />
                )}
                <span className="profile-name">{userData.name || "My Profile"}</span>
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
                      <button onClick={() => navigate("/user-dashboard")}>
                        Dashboard
                      </button>
                      <button onClick={handleSignOut}>Sign Out</button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ---------- MOBILE TOGGLE ---------- */}
        <div className="menu-toggle" onClick={() => setIsMenuOpen(true)}>
          <FaBars />
        </div>
      </div>

      {/* ---------- MOBILE MENU ---------- */}
      {isMenuOpen && (
        <div className="menu-overlay">
          <div className="menu-content">
            <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
              <FaTimes />
            </button>

            <ul>
              <li><a href="#home" onClick={(e) => handleNavClick(e, "#home")}>Home</a></li>
              <li><a href="#explore" onClick={(e) => handleNavClick(e, "#explore")}>Explore</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, "#services")}>Services</a></li>
              <li><a href="#blogs" onClick={(e) => handleNavClick(e, "#blogs")}>Blogs</a></li>
            </ul>

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

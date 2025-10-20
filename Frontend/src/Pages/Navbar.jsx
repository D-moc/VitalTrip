import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import AuthModal from "../components/AuthModal/AuthModal";
import ForgotPassword from "../Auth/ForgotPassword";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [roleChoiceOpen, setRoleChoiceOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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

  const handleSignOut = async () => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");
    const endpoint = role === "captain" ? "/captains/logout" : "/users/logout";
    try {
      await fetch(endpoint, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.clear();
    setUserRole(null);
    setIsDropdownOpen(false);
    navigate("/");
    window.dispatchEvent(new Event("storage"));
  };

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

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#2e8b57] to-[#3d8af5] shadow-lg py-4 px-6 md:px-10 font-[Poppins]">
        <div className="flex items-center justify-between max-w-[1300px] mx-auto">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <img
              src={logo}
              alt="VitalTrip Logo"
              className="w-11 h-11 rounded-full border-2 border-white/80 hover:border-white transition-transform hover:scale-105"
            />
            <span className="text-white text-2xl font-extrabold tracking-wide">
              VitalTrip
            </span>
          </div>

          <ul className="hidden md:flex gap-8 text-white font-semibold text-base lg:text-lg">
            {["home", "explore", "services", "blogs"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  onClick={(e) => handleNavClick(e, `#${item}`)}
                  className="hover:text-yellow-300 transition"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-5 min-w-[200px] justify-end relative">
            {!userRole ? (
              <>
                <button
                  onClick={() => setRoleChoiceOpen(!roleChoiceOpen)}
                  className="bg-white text-[#2e8b57] font-bold px-6 py-2.5 rounded-md shadow-md hover:bg-[#2e8b57] hover:text-white transition text-base"
                >
                  Login / Signup
                </button>

                {/* Small Dropdown */}
                {roleChoiceOpen && (
                  <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl border border-gray-200 w-56 animate-fadeIn">
                    <button
                      onClick={() => {
                        setShowAuthModal({ type: "user" });
                        setRoleChoiceOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-700"
                    >
                      👤 User
                    </button>
                    <button
                      onClick={() => {
                        setShowAuthModal({ type: "captain" });
                        setRoleChoiceOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-700"
                    >
                      🚗 Admin
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-white font-semibold"
                >
                  <FaUserCircle size={25} />
                  <span>
                    {userRole === "captain" ? "Captain" : "My Profile"}
                  </span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 bg-white text-gray-700 rounded-md shadow-lg w-44 text-sm animate-fadeIn">
                    {userRole === "captain" ? (
                      <>
                        <button
                          onClick={() => navigate("/captain-dashboard")}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate("/your-trips")}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Your Trips
                        </button>
                        <button
                          onClick={() => navigate("/reviews")}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Reviews
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Sign Out
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className="text-white text-2xl md:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          role={showAuthModal.type}
          onClose={() => setShowAuthModal(false)}
          onForgotPassword={() => {
            setShowForgotPassword(true);
            setShowAuthModal(false);
          }}
        />
      )}

      {/* Forgot Password */}
      {showForgotPassword && (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      )}
    </>
  );
}

export default Navbar;

import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaRobot } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { BASE_URL } from "../utils/config";
import ChatbotPanel from "../components/ChatbotPanel"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showChatbot, setShowChatbot] = useState(false); 

  const { user, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const ids = ["home", "destinations", "services", "blogs"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setActiveSection(entry.target.id), 150); 
          }
        });
      },
      { threshold: 0.4 } 
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [location.pathname]);

  /* -------------------------------------------------------------------------- */
  /* ✅ Smooth scroll */
  /* -------------------------------------------------------------------------- */
  const goToSection = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        const offset = document.querySelector("header")?.offsetHeight || 100;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setMenuOpen(false);
    } else {
      navigate("/", { state: { scrollTo: id } });
      setMenuOpen(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* ✅ Auth utilities */
  /* -------------------------------------------------------------------------- */
  const handleLogout = () => {
    logout();
    setShowProfile(false);
    navigate("/");
  };

  const displayName =
    user?.fullname?.firstname || user?.firstname || "Traveler";

  const profileImage = user?.profileImage
    ? user.profileImage.startsWith("http")
      ? user.profileImage
      : `${BASE_URL}/${user.profileImage.replace(/^\/+/, "")}`
    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-green-800 via-teal-800 to-green-800 border-b border-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-5 md:px-10">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => goToSection("home")}
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shadow-md">
              <img
                src={logo}
                alt="VitalTrip Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-wide">
              Vital<span className="text-yellow-200">Trip</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav
            className={`${
              menuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row items-start md:items-center absolute md:static top-[70px] left-0 w-full md:w-auto bg-white md:bg-transparent p-5 md:p-0 gap-6 md:gap-10 shadow-md md:shadow-none rounded-b-2xl transition-all duration-200`}
          >
            {["home", "destinations", "services", "blogs"].map((section) => (
              <button
                key={section}
                onClick={() => goToSection(section)}
                className={`relative text-2xl font-bold transition-all duration-300 group ${
                  activeSection === section
                    ? "text-yellow-400 scale-105"
                    : "text-gray-800 md:text-white hover:text-yellow-300"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                <span
                  className={`absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 h-[3px] rounded-full transition-all duration-500 ease-in-out ${
                    activeSection === section
                      ? "w-10 bg-yellow-400 opacity-100 shadow-[0_0_10px_#fde68a]"
                      : "w-0 opacity-0 bg-transparent"
                  }`}
                ></span>
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* 🧠 VitalAsk Button */}
            <button
              onClick={() => setShowChatbot(true)} 
              className="flex items-center gap-2 bg-white/20 border border-white/30 text-white font-semibold rounded-full px-4 py-2 hover:bg-white/30 transition-all duration-300"
            >
              <FaRobot className="text-yellow-200 text-lg animate-pulse" />
              {/* <span className="font-bold">Vital</span> */}
              <span className="text-xs italic animate-bounce text-yellow-200">
                Ask
              </span>
            </button>

            {/* 👤 Profile */}
            {user ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 font-bold text-white hover:scale-105 transition-transform"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {displayName}
                </button>

                {showProfile && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200">
                    <button
                      onClick={() => {
                        setShowProfile(false);
                        navigate(
                          role === "captain"
                            ? "/captain/dashboard"
                            : "/user/dashboard"
                        );
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/auth")}
                className="bg-white text-orange-600 font-bold px-5 py-2 rounded-lg shadow-md hover:bg-orange-50 transition-all"
              >
                Login
              </button>
            )}

            {/* 📱 Mobile Menu */}
            <button
              className="md:hidden text-white hover:scale-110 transition-transform"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* 🧠 Chatbot Modal with Framer Motion */}
      <AnimatePresence>
        {showChatbot && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[98]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChatbot(false)}
            />
            <motion.div
              className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-[99] flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
            >
              <div className="flex justify-between items-center bg-gradient-to-r from-green-700 to-teal-600 text-white px-5 py-3">
                <h2 className="text-xl font-bold">Vital AI Assistant 🤖</h2>
                <button
                  onClick={() => setShowChatbot(false)}
                  className="hover:text-yellow-300"
                >
                  ✖
                </button>
              </div>
              <ChatbotPanel />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

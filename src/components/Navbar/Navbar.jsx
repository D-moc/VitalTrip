import React, { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import logo from "../../assets/logo.png";

import "./Navbar.css";

function Navbar() {
  const [authType, setAuthType] = useState(null); // login,register,null
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({ email: "", password: "", confirm: "", name: "" });
  const [error, setError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (authType === "register") {
      const exists = users.find((u) => u.email === form.email);
      if (exists) {
        setError("Email already registered. Please login instead.");
        return;
      }
      if (form.password !== form.confirm) {
        setError("Passwords do not match.");
        return;
      }
      if (!validatePassword(form.password)) {
        setError("Password must be at least 8 characters, include upper, lower, number & special character.");
        return;
      }

      const role = form.email.includes("admin@") ? "admin" : "user";
      const newUser = { name: form.name, email: form.email, password: form.password, role };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
    }

    if (authType === "login") {
      const existing = users.find((u) => u.email === form.email && u.password === form.password);
      if (!existing) {
        setError("Invalid credentials. Please try again or register.");
        return;
      }
      setCurrentUser(existing);
    }

    setAuthType(null);
    setForm({ email: "", password: "", confirm: "", name: "" });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const getUsername = (email) => (email ? email.split("@")[0] : "");

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo">
            <img src={logo} alt="logo" className="logo-img" />
            <span>VitalTrip</span>
          </div>

          {/* Desktop elements */}
          <ul className="nav-links desktop">
            <li><a href="#home">Home</a></li>
            <li><a href="#explore">Explore</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#blogs">Blogs</a></li>
          </ul>

          {/* Desktop Actions */}
          <div className="nav-actions desktop">
            {currentUser ? (
              <>
                <div className="user-info">
                  <FaUserCircle />
                  {getUsername(currentUser.email)} ({currentUser.role.toUpperCase()})
                </div>
                <button className="btn logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="btn" onClick={() => setAuthType("login")}>Login</button>
                <button className="btn" onClick={() => setAuthType("register")}>Register</button>
              </>
            )}
          </div>

          {/* Menu bar */}
          <div className="menu-toggle" onClick={() => setIsMenuOpen(true)}>
            <FaBars />
          </div>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
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
              {currentUser ? (
                <>
                  <div className="user-info">
                    <FaUserCircle />
                    {getUsername(currentUser.email)} ({currentUser.role.toUpperCase()})
                  </div>
                  <button className="btn logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button className="btn" onClick={() => { setAuthType("login"); setIsMenuOpen(false); }}>Login</button>
                  <button className="btn" onClick={() => { setAuthType("register"); setIsMenuOpen(false); }}>Register</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {authType && (
        <div className="auth-overlay">
          <div className="auth-modal">
            <h2>{authType === "login" ? "Login" : "Register"}</h2>
            <form onSubmit={handleSubmit}>
              {authType === "register" && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              {authType === "register" && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  required
                />
              )}
              {authType === "register" && (
                <p className="password-rule">
                  Password must be at least 8 chars, include upper, lower, number & special char.
                </p>
              )}
              {error && <p className="error">{error}</p>}
              <button type="submit" className="btn auth-btn">
                {authType === "login" ? "Login" : "Create Account"}
              </button>
            </form>
            <p className="switch-auth">
              {authType === "login" ? (
                <>Don’t have an account? <span onClick={() => setAuthType("register")}>Register</span></>
              ) : (
                <>Already registered? <span onClick={() => setAuthType("login")}>Login</span></>
              )}
            </p>
            <button className="close-btn" onClick={() => setAuthType(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;

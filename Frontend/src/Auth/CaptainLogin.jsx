import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CaptainLogin.css";

function CaptainLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/captains/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("role", "captain");
        alert("Captain Login Successful!");
        navigate("/");
        window.dispatchEvent(new Event("storage")); // ✅ Update Navbar instantly
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      alert("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-section">
      <div className="login-container">
        {/* LEFT SIDE IMAGE */}
        <div className="login-left">
          <div className="image-overlay"></div>
          <img
            src="https://img.freepik.com/free-vector/travel-concept-illustration_114360-8202.jpg"
            alt="Captain login"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="login-right">
          <h2>
            Captain <span>Login</span>
          </h2>
          <p className="subtitle">
            Manage your rides, view your trips, and explore with VitalTrip 🚗
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            {/* Forgot Password */}
            <p
              className="forgot-link"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </p>

            <button type="submit" className="btn login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="switch-auth">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/captain-signup")}>Sign Up here</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CaptainLogin;

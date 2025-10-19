import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserLogin.css";

function UserLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/users/login", {
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
        localStorage.setItem("role", "user");
        alert("Login Successful! ✨");
        navigate("/");
        window.dispatchEvent(new Event("storage"));
      } else {
        alert(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-section">
      <div className="login-container">
        {/* LEFT IMAGE */}
        <div className="login-left">
          <div className="image-overlay"></div>
          <img
            src="https://img.freepik.com/free-vector/travel-concept-illustration_114360-8202.jpg"
            alt="Travel login illustration"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="login-right">
          <h2>
            Welcome Back to <span>VitalTrip</span>
          </h2>
          <p className="subtitle">Continue your journey planning with ease 🌍</p>

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
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;

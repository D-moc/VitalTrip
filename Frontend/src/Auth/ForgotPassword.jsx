import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email) {
      alert("⚠️ Please enter your registered email.");
      return;
    }

    if (form.password.length < 6) {
      alert("⚠️ Password must be at least 6 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("❌ Passwords do not match. Try again.");
      return;
    }

    alert("✅ Password successfully reset!");
    setForm({ email: "", password: "", confirmPassword: "" });
    navigate("/login");
  };

  return (
    <div className="reset-overlay">
      <div className="reset-modal">
        <button className="close-btn" onClick={() => navigate("/")}>×</button>

        <div className="reset-content">
          {/* Left illustration */}
          <div className="reset-left">
            <img
              src="https://img.freepik.com/free-vector/login-concept-illustration_114360-757.jpg"
              alt="Reset Password Illustration"
            />
          </div>

          {/* Right form */}
          <div className="reset-right">
            <h2>
              Reset <span>Password</span> 🔐
            </h2>
            <p className="subtitle">
              Enter your email and set a new password to continue.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Enter your registered email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="New password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />

              <button type="submit" className="reset-btn">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

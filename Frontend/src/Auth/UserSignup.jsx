import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserSignUp.css";

function UserSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: {
            firstname: form.firstname,
            lastname: form.lastname,
          },
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("role", "user");
        alert("User registered successfully! 🎉");
        navigate("/");
        window.dispatchEvent(new Event("storage"));
      } else {
        alert(data.message || "Signup failed! Please check your details.");
      }
    } catch (error) {
      alert("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-section">
      <div className="signup-container">
        {/* LEFT IMAGE */}
        <div className="signup-left">
          <img
            src="https://img.freepik.com/free-vector/travel-concept-illustration_114360-835.jpg"
            alt="Trip planner at desk"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="signup-right">
          <h2>
            Join <span>VitalTrip</span>
          </h2>
          <p className="subtitle">
            Plan your adventures smarter — start your journey with us ✈️
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                placeholder="First Name"
                value={form.firstname}
                onChange={(e) =>
                  setForm({ ...form, firstname: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={form.lastname}
                onChange={(e) =>
                  setForm({ ...form, lastname: e.target.value })
                }
              />
            </div>

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

            <button type="submit" className="btn signup-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="switch-auth">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login here</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;

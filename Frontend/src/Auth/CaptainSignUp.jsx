// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./CaptainSignUp.css";

// function CaptainSignUp() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("/captains/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fullname: {
//             firstname: form.firstname,
//             lastname: form.lastname,
//           },
//           email: form.email,
//           password: form.password,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // ✅ Store token & role
//         localStorage.setItem("authToken", data.token);
//         localStorage.setItem("role", "captain");

//         alert("Captain registration successful! 🎉");

//         // ✅ Redirect to home & reload navbar state
//         navigate("/");
//         window.location.reload();
//       } else {
//         alert(data.message || "Registration failed");
//       }
//     } catch (err) {
//       console.error("Registration error:", err);
//       alert("Something went wrong. Try again!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signup-section">
//       <div className="signup-container">
//         <div className="signup-left">
//           <img
//             src="https://img.freepik.com/free-vector/travel-concept-illustration_114360-835.jpg"
//             alt="Captain register"
//           />
//         </div>

//         <div className="signup-right">
//           <h2>
//             Register as <span>Captain</span>
//           </h2>
//           <p className="subtitle">
//             Manage your rides, handle user bookings, and explore with VitalTrip 🚘
//           </p>

//           <form onSubmit={handleSubmit}>
//             <div className="form-row">
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 value={form.firstname}
//                 onChange={(e) =>
//                   setForm({ ...form, firstname: e.target.value })
//                 }
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 value={form.lastname}
//                 onChange={(e) =>
//                   setForm({ ...form, lastname: e.target.value })
//                 }
//               />
//             </div>

//             <div className="input-group">
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 value={form.email}
//                 onChange={(e) =>
//                   setForm({ ...form, email: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={(e) =>
//                   setForm({ ...form, password: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <button type="submit" className="btn signup-btn" disabled={loading}>
//               {loading ? "Registering..." : "Register Captain"}
//             </button>
//           </form>

//           <p className="switch-auth">
//             Already registered?{" "}
//             <span onClick={() => navigate("/captain-login")}>Login here</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CaptainSignUp;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CaptainSignUp.css";

function CaptainSignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/captains/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: { firstname: form.firstname, lastname: form.lastname },
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("role", "captain");
        alert("Captain registration successful!");
        navigate("/");
        window.dispatchEvent(new Event("storage"));
      } else {
        alert(data.message || "Registration failed");
      }
    } catch {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-section">
      <div className="signup-container">
        <div className="signup-left">
          <img src="https://img.freepik.com/free-vector/travel-concept-illustration_114360-835.jpg" alt="Captain register" />
        </div>
        <div className="signup-right">
          <h2>Register as <span>Captain</span></h2>
          <p className="subtitle">Manage your trips with VitalTrip 🚘</p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" placeholder="First Name" value={form.firstname} onChange={(e) => setForm({ ...form, firstname: e.target.value })} required />
              <input type="text" placeholder="Last Name" value={form.lastname} onChange={(e) => setForm({ ...form, lastname: e.target.value })} />
            </div>
            <div className="input-group">
              <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </div>
            <button type="submit" className="btn signup-btn" disabled={loading}>
              {loading ? "Registering..." : "Register Captain"}
            </button>
          </form>

          <p className="switch-auth">
            Already registered? <span onClick={() => navigate("/captain-login")}>Login here</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CaptainSignUp;

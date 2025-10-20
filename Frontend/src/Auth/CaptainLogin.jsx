// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";          // ✅ Axios instance
// import emailjs from "@emailjs/browser";  // ✅ EmailJS integration
// import "./CaptainLogin.css";

// function CaptainLogin() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // 🟩 Login request
//       const res = await api.post("/captains/login", {
//         email: form.email,
//         password: form.password,
//       });

//       // 🟩 Store token + role
//       localStorage.setItem("authToken", res.data.token);
//       localStorage.setItem("role", "captain");

//       // 🟩 Send email confirmation
//       await emailjs.send(
//         "service_al5yitk",
//         "template_rp23wih",
//         {
//           from_name: "VitalTrip",
//           to_email: form.email,
//           message: `Welcome back, Captain! 🚗 You have successfully logged into your VitalTrip account.`,
//         },
//         "N3wkfGFUrmWRSm_AQ"
//       );

//       alert("✅ Login successful! Confirmation email sent.");
//       navigate("/"); // ✅ Redirect to home
//       window.dispatchEvent(new Event("storage"));
//     } catch (error) {
//       console.error("Login Error:", error);
//       alert(error.response?.data?.message || "Invalid credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-section">
//       <div className="login-container">
//         <div className="login-left">
//           <div className="image-overlay"></div>
//           <img
//             src="https://img.freepik.com/free-vector/travel-concept-illustration_114360-8202.jpg"
//             alt="Captain login"
//           />
//         </div>

//         <div className="login-right">
//           <h2>
//             Captain <span>Login</span>
//           </h2>
//           <p className="subtitle">
//             Manage your rides, view your trips, and explore with VitalTrip 🚗
//           </p>

//           <form onSubmit={handleSubmit}>
//             <div className="input-group">
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
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

//             <p
//               className="forgot-link"
//               onClick={() => navigate("/forgot-password")}
//             >
//               Forgot Password?
//             </p>

//             <button type="submit" className="btn login-btn" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <p className="switch-auth">
//             Don’t have an account?{" "}
//             <span onClick={() => navigate("/captain-signup")}>
//               Sign Up here
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CaptainLogin;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";          // ✅ Axios instance
// import emailjs from "@emailjs/browser";  // ✅ EmailJS integration
// import "./CaptainLogin.css";

// function CaptainLogin() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // 🟩 Backend Login
//       const res = await api.post("/captains/login", {
//         email: form.email,
//         password: form.password,
//       });

//       // 🟩 Store token + role
//       localStorage.setItem("authToken", res.data.token);
//       localStorage.setItem("role", "captain");

//       // 🟩 Send email confirmation
//       await emailjs.send(
//         "service_al5yitk",
//         "template_rp23wih",
//         {
//           from_name: "VitalTrip",
//           to_email: form.email,
//           message: `Welcome back, Captain! 🚗 You have successfully logged into your VitalTrip account.`,
//         },
//         "N3wkfGFUrmWRSm_AQ"
//       );

//       alert("✅ Login successful! Confirmation email sent.");
//       navigate("/"); // Redirect home
//       window.dispatchEvent(new Event("storage"));
//     } catch (error) {
//       console.error("Login Error:", error);
//       alert(error.response?.data?.message || "Invalid credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-overlay">
//       <div className="auth-modal">
//         <button className="close-btn" onClick={() => navigate("/")}>×</button>

//         <div className="auth-content">
//           {/* LEFT SIDE IMAGE */}
//           <div className="auth-image">
//             <img
//               src="https://img.freepik.com/free-vector/taxi-driver-concept-illustration_114360-14250.jpg"
//               alt="Captain Login"
//             />
//           </div>

//           {/* RIGHT FORM SIDE */}
//           <div className="auth-form">
//             <h2>
//               Captain <span>Login</span>
//             </h2>
//             <p className="subtitle">
//               Manage your rides, view trips, and explore with VitalTrip 🚗
//             </p>

//             <form onSubmit={handleSubmit}>
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 required
//               />

//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 required
//               />

//               <p
//                 className="forgot-link"
//                 onClick={() => navigate("/forgot-password")}
//               >
//                 Forgot Password?
//               </p>

//               <button type="submit" className="btn login-btn" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </button>
//             </form>

//             <p className="switch-auth">
//               Don’t have an account?{" "}
//               <span onClick={() => navigate("/captain-signup")}>
//                 Register here
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CaptainLogin;



//before toastify
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import emailjs from "@emailjs/browser";
// import "./CaptainLogin.css";

// function CaptainLogin() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await api.post("/captains/login", {
//         email: form.email,
//         password: form.password,
//       });

//       localStorage.setItem("authToken", res.data.token);
//       localStorage.setItem("role", "captain");

//       await emailjs.send(
//         "service_al5yitk",
//         "template_rp23wih",
//         {
//           from_name: "VitalTrip",
//           to_email: form.email,
//           message: `Welcome back, Captain! 🚗 You have successfully logged into your VitalTrip account.`,
//         },
//         "N3wkfGFUrmWRSm_AQ"
//       );

//       alert("✅ Login successful! Confirmation email sent.");
//       navigate("/");
//       window.dispatchEvent(new Event("storage"));
//     } catch (error) {
//       console.error("Login Error:", error);
//       alert(error.response?.data?.message || "Invalid credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-overlay">
//       <div className="auth-modal">
//         <button className="close-btn" onClick={() => navigate("/")}>×</button>

//         <div className="auth-content">
//           <div className="auth-image">
//             <img
//               src="https://img.freepik.com/free-vector/taxi-driver-concept-illustration_114360-14250.jpg"
//               alt="Captain Login"
//             />
//           </div>

//           <div className="auth-form">
//             <h2>
//               Captain <span>Login</span>
//             </h2>
//             <p className="subtitle">
//               Manage your rides, view trips, and explore with VitalTrip 🚗
//             </p>

//             <form onSubmit={handleSubmit}>
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 required
//               />

//               <p
//                 className="forgot-link"
//                 onClick={() => navigate("/forgot-password")}
//               >
//                 Forgot Password?
//               </p>

//               <button type="submit" className="btn login-btn" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </button>
//             </form>

//             <p className="switch-auth">
//               Don’t have an account?{" "}
//               <span onClick={() => navigate("/captain-signup")}>
//                 Register here
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CaptainLogin;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CaptainLogin.css";

function CaptainLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/captains/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("role", "captain");

      // ✅ Send confirmation email (optional)
      try {
        await emailjs.send(
          "service_al5yitk",
          "template_rp23wih",
          {
            from_name: "VitalTrip",
            to_email: form.email,
            message: `Welcome back, Captain! 🚗 You have successfully logged into your VitalTrip account.`,
          },
          "N3wkfGFUrmWRSm_AQ"
        );
      } catch (err) {
        console.warn("EmailJS send failed:", err);
      }

      toast.success("✅ Login successful! Welcome back, Captain!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      setTimeout(() => {
        navigate("/");
        window.dispatchEvent(new Event("storage"));
      }, 2500);
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Invalid credentials.", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-overlay">
        <div className="auth-modal">
          <button className="close-btn" onClick={() => navigate("/")}>×</button>

          <div className="auth-content">
            {/* ✅ SAME IMAGE STYLE AS USER LOGIN */}
            <div className="auth-image">
              <img
                src="https://img.freepik.com/free-vector/travel-concept-illustration_114360-8202.jpg"
                alt="Captain Login"
              />
            </div>

            <div className="auth-form">
              <h2>
                Captain <span>Login</span>
              </h2>
              <p className="subtitle">
                Manage your rides, view trips, and explore with VitalTrip 🚗
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email Address"
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

                <p
                  className="forgot-link"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </p>

                <button
                  type="submit"
                  className="btn login-btn"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <p className="switch-auth">
                Don’t have an account?{" "}
                <span onClick={() => navigate("/captain-signup")}>
                  Register here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Toastify Container */}
      <ToastContainer />
    </>
  );
}

export default CaptainLogin;

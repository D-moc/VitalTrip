// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";          // ✅ Axios instance
// import emailjs from "@emailjs/browser";  // ✅ EmailJS integration
// import "./UserLogin.css";

// function UserLogin() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // 🟩 Backend login
//       const res = await api.post("/users/login", {
//         email: form.email,
//         password: form.password,
//       });

//       // 🟩 Store token + role
//       localStorage.setItem("authToken", res.data.token);
//       localStorage.setItem("role", "user");

//       // 🟩 Send email confirmation
//       await emailjs.send(
//         "service_al5yitk", // service ID
//         "template_rp23wih", // template ID
//         {
//           from_name: "VitalTrip",
//           to_email: form.email,
//           message: `Welcome back! You have successfully logged in to VitalTrip. ✈️`,
//         },
//         "N3wkfGFUrmWRSm_AQ" // public key
//       );

//       alert("✅ Login successful! Confirmation email sent.");
//       navigate("/"); // redirect home
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
//         {/* LEFT IMAGE */}
//         <div className="login-left">
//           <div className="image-overlay"></div>
//           <img
//             src="https://img.freepik.com/free-vector/travel-concept-illustration_114360-8202.jpg"
//             alt="Travel login illustration"
//           />
//         </div>

//         {/* RIGHT FORM */}
//         <div className="login-right">
//           <h2>
//             Welcome Back to <span>VitalTrip</span>
//           </h2>
//           <p className="subtitle">
//             Continue your journey planning with ease 🌍
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
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
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
//             <span onClick={() => navigate("/signup")}>Sign Up</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserLogin;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import emailjs from "@emailjs/browser";
// import "./UserLogin.css";

// function UserLogin() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // 🟩 Backend login API
//       const res = await api.post("/users/login", {
//         email: form.email,
//         password: form.password,
//       });

//       // 🟩 Store token and role
//       localStorage.setItem("authToken", res.data.token);
//       localStorage.setItem("role", "user");

//       // 🟩 Send confirmation email via EmailJS
//       await emailjs.send(
//         "service_al5yitk", // ✅ your service ID
//         "template_rp23wih", // ✅ your template ID
//         {
//           from_name: "VitalTrip",
//           to_email: form.email,
//           message: `Welcome back! You have successfully logged in to VitalTrip. ✈️`,
//         },
//         "N3wkfGFUrmWRSm_AQ" // ✅ your public key
//       );

//       alert("✅ Login successful! Confirmation email sent.");
//       navigate("/"); // redirect to home
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
//               src="https://img.freepik.com/free-vector/travel-concept-illustration_114360-8202.jpg"
//               alt="VitalTrip Login"
//             />
//           </div>

//           {/* RIGHT SIDE FORM */}
//           <div className="auth-form">
//             <h2>
//               Welcome Back to <span>VitalTrip</span>
//             </h2>
//             <p className="subtitle">
//               Continue your journey planning with ease 🌍
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
//               <span onClick={() => navigate("/signup")}>Sign Up</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserLogin;



//alert
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import emailjs from "@emailjs/browser";
// import "./UserLogin.css";

// function UserLogin() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await api.post("/users/login", {
//         email: form.email,
//         password: form.password,
//       });

//       localStorage.setItem("authToken", res.data.token);
//       localStorage.setItem("role", "user");

//       await emailjs.send(
//         "service_al5yitk",
//         "template_rp23wih",
//         {
//           from_name: "VitalTrip",
//           to_email: form.email,
//           message: `Welcome back! You have successfully logged in to VitalTrip. ✈️`,
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
//               src="https://img.freepik.com/free-vector/travel-concept-illustration_114360-8202.jpg"
//               alt="VitalTrip Login"
//             />
//           </div>

//           <div className="auth-form">
//             <h2>
//               Welcome Back to <span>VitalTrip</span>
//             </h2>
//             <p className="subtitle">
//               Continue your journey planning with ease 🌍
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
//               <span onClick={() => navigate("/signup")}>Sign Up</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserLogin;


// change to toastify

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserLogin.css";

function UserLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔹 Login API
      const res = await api.post("/users/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("role", "user");

      // 🔹 Send EmailJS notification
      await emailjs.send(
        "service_al5yitk",
        "template_rp23wih",
        {
          from_name: "VitalTrip",
          to_email: form.email,
          message: `Welcome back! You have successfully logged in to VitalTrip. ✈️`,
        },
        "N3wkfGFUrmWRSm_AQ"
      );

  //     toast.success("✅ Login successful! Welcome back!", {
  //       position: "top-center",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });

  //     navigate("/");
  //     window.dispatchEvent(new Event("storage"));
  //   } catch (error) {
  //     console.error("Login Error:", error);
  //     toast.error(error.response?.data?.message || "Invalid credentials.", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
   toast.success("✅ Login successful! Welcome back!",{
          position: "top-center",
          autoClose: 2000,
        });
  
        setTimeout(() => {
          window.dispatchEvent(new Event("storage"));
          navigate("/");
        }, 2200);
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Invalid credentials.", {
          position: "top-center",
          autoClose: 2500,
        });
      } finally {
        setLoading(false);
      }
 };

  return (
    <>
      <div className="auth-overlay">
        <div className="auth-modal">
          <button className="close-btn" onClick={() => navigate("/")}>
            ×
          </button>

          <div className="auth-content">
            {/* LEFT IMAGE */}
            <div className="auth-image">
              <img
                src="https://img.freepik.com/free-vector/travel-concept-illustration_114360-8202.jpg"
                alt="VitalTrip Login"
              />
            </div>

            {/* RIGHT FORM */}
            <div className="auth-form">
              <h2>
                Welcome Back to <span>VitalTrip</span>
              </h2>
              <p className="subtitle">
                Continue your journey planning with ease 🌍
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
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
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
                <span onClick={() => navigate("/signup")}>Sign Up</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Toast Notifications */}
      <ToastContainer />
    </>
  );
}

export default UserLogin;

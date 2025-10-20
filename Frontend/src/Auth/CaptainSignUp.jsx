// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import emailjs from "@emailjs/browser";
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
//       const res = await api.post("/captains/register", {
//         fullname: { firstname: form.firstname, lastname: form.lastname },
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
//           message: `Welcome aboard, Captain ${form.firstname}! 🚗 Your VitalTrip account has been created.`,
//         },
//         "N3wkfGFUrmWRSm_AQ"
//       );

//       alert("✅ Captain registered! Confirmation email sent.");
//       navigate("/");
//       window.dispatchEvent(new Event("storage"));
//     } catch (error) {
//       alert(error.response?.data?.message || "Registration failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signup-section">
//       <div className="signup-container">
//         <button className="close-btn" onClick={() => navigate("/")}>×</button>

//         <div className="signup-left">
//           <img
//             src="https://img.freepik.com/free-vector/travel-concept-illustration_114360-835.jpg"
//             alt="Captain signup"
//           />
//         </div>

//         <div className="signup-right">
//           <h2>
//             Register as <span>Captain</span>
//           </h2>
//           <p className="subtitle">Manage your trips with VitalTrip 🚘</p>

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

//             <input
//               type="email"
//               placeholder="Email Address"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               required
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) =>
//                 setForm({ ...form, password: e.target.value })
//               }
//               required
//             />

//             <button type="submit" className="signup-btn" disabled={loading}>
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


// src/Auth/CaptainSignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CaptainSignUp.css";

function CaptainSignUp() {
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
      const res = await api.post("/captains/register", {
        fullname: { firstname: form.firstname, lastname: form.lastname },
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("role", "captain");

      // Send welcome email (optional)
      try {
        await emailjs.send(
          "service_al5yitk",
          "template_rp23wih",
          {
            from_name: "VitalTrip",
            to_email: form.email,
            message: `Welcome aboard, Captain ${form.firstname}! 🚗 Your VitalTrip account has been created.`,
          },
          "N3wkfGFUrmWRSm_AQ"
        );
      } catch (err) {
        console.warn("EmailJS send failed:", err);
      }

      toast.success("🎉 Captain registered successfully!", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });

      setTimeout(() => {
        navigate("/");
        window.dispatchEvent(new Event("storage"));
      }, 2500);
    } catch (error) {
      console.error("Captain Registration Error:", error);
      toast.error(error.response?.data?.message || "Registration failed!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="signup-section">
        <div className="signup-container">
          <button className="close-btn" onClick={() => navigate("/")}>
            ×
          </button>

          <div className="signup-left">
            <img
              src="https://img.freepik.com/free-vector/travel-concept-illustration_114360-835.jpg"alt="Captain signup"
            />
          </div>

          <div className="signup-right">
            <h2>
              Register as <span>Captain</span>
            </h2>
            <p className="subtitle">Manage your trips with VitalTrip 🚘</p>

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

              <button type="submit" className="signup-btn" disabled={loading}>
                {loading ? "Registering..." : "Register Captain"}
              </button>
            </form>

            <p className="switch-auth">
              Already registered?{" "}
              <span onClick={() => navigate("/captain-login")}>Login here</span>
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Toastify Container */}
      <ToastContainer />
    </>
  );
}

export default CaptainSignUp;

// // src/Auth/UserSignup.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import emailjs from "@emailjs/browser";
// import logoImg from "../assets/logo.png"; // optional small logo shown in header

// export default function UserSignup() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await api.post("/users/register", {
//         fullname: { firstname: form.firstname, lastname: form.lastname },
//         email: form.email,
//         password: form.password,
//       });

//       // store token + role
//       localStorage.setItem("authToken", res.data.token);
//       localStorage.setItem("role", "user");

//       // optional: send welcome email via EmailJS
//       try {
//         await emailjs.send(
//           "service_al5yitk",
//           "template_rp23wih",
//           {
//             from_name: "VitalTrip",
//             to_email: form.email,
//             message: `Welcome ${form.firstname}! Your VitalTrip account is ready. Explore and plan your next trip! ✈️`,
//           },
//           "N3wkfGFUrmWRSm_AQ"
//         );
//       } catch (err) {
//         console.warn("EmailJS send failed:", err);
//       }

//       // notify and redirect
//       alert("🎉 Registered successfully!");
//       window.dispatchEvent(new Event("storage")); // update navbar
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       alert(err?.response?.data?.message || "Registration failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
//       <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">
//         {/* left illustration */}
//         <div className="bg-gradient-to-b from-[#320620] to-[#7b13ca] p-8 flex items-center justify-center">
//           <div className="w-72 h-72 rounded-lg bg-white/90 p-6 flex items-center justify-center">
//             <img
//               src="https://img.freepik.com/free-vector/travel-concept-illustration_114360-835.jpg"
//               alt="signup"
//               className="w-full h-full object-contain"
//             />
//           </div>
//         </div>

//         {/* form */}
//         <div className="p-8 md:p-12">
//           <div className="flex items-center gap-3 mb-6">
//             <img src={logoImg} alt="logo" className="w-10 h-10 rounded" />
//             <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
//               Join <span className="text-[#1976d2]">VitalTrip</span>
//             </h2>
//           </div>

//           <p className="text-sm text-slate-600 mb-6">
//             Plan your adventures smarter — start your journey with us ✈️
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 name="firstname"
//                 value={form.firstname}
//                 onChange={handleChange}
//                 required
//                 placeholder="First Name"
//                 className="w-full rounded-lg border border-gray-200 p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
//               />
//               <input
//                 name="lastname"
//                 value={form.lastname}
//                 onChange={handleChange}
//                 placeholder="Last Name"
//                 className="w-full rounded-lg border border-gray-200 p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
//               />
//             </div>

//             <input
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               type="email"
//               placeholder="Email Address"
//               className="w-full rounded-lg border border-gray-200 p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
//             />

//             <input
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               type="password"
//               placeholder="Password"
//               className="w-full rounded-lg border border-gray-200 p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-lg py-3 font-semibold text-white bg-gradient-to-r from-[#1a73e8] to-[#4e54c8] disabled:opacity-60"
//             >
//               {loading ? "Creating account..." : "Create Account"}
//             </button>
//           </form>

//           <p className="mt-6 text-center text-sm text-slate-600">
//             Already have an account?{" "}
//             <button
//               onClick={() => navigate("/login")}
//               className="text-[#1976d2] font-semibold hover:underline"
//             >
//               Login here
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import emailjs from "@emailjs/browser";
// import "./UserSignup.css";

// function UserSignup() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Register API call
//       const res = await api.post("/users/register", {
//         fullname: { firstname: form.firstname, lastname: form.lastname },
//         email: form.email,
//         password: form.password,
//       });

//       localStorage.setItem("authToken", res.data.token);
//       localStorage.setItem("role", "user");

//       // Send welcome email
//       try {
//         await emailjs.send(
//           "service_al5yitk",
//           "template_rp23wih",
//           {
//             from_name: "VitalTrip",
//             to_email: form.email,
//             message: `Welcome ${form.firstname}! Your VitalTrip account is ready. ✈️`,
//           },
//           "N3wkfGFUrmWRSm_AQ"
//         );
//       } catch (err) {
//         console.warn("EmailJS send failed:", err);
//       }

//       alert("🎉 Registration successful!");
//       window.dispatchEvent(new Event("storage"));
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Registration failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signup-section">
//       <div className="signup-container">
//         <button className="close-btn" onClick={() => navigate("/")}>×</button>

//         {/* LEFT IMAGE */}
//         <div className="signup-left">
//           <img
//             src="https://img.freepik.com/free-vector/travel-concept-illustration_114360-835.jpg"
//             alt="Signup Illustration"
//           />
//         </div>

//         {/* RIGHT FORM */}
//         <div className="signup-right">
//           <h2>
//             Join <span>VitalTrip</span>
//           </h2>
//           <p className="subtitle">
//             Plan your adventures smarter — start your journey today ✈️
//           </p>

//           <form onSubmit={handleSubmit}>
//             <div className="form-row">
//               <input
//                 name="firstname"
//                 placeholder="First Name"
//                 value={form.firstname}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 name="lastname"
//                 placeholder="Last Name"
//                 value={form.lastname}
//                 onChange={handleChange}
//               />
//             </div>

//             <input
//               name="email"
//               type="email"
//               placeholder="Email Address"
//               value={form.email}
//               onChange={handleChange}
//               required
//             />

//             <input
//               name="password"
//               type="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//             />

//             <button type="submit" className="signup-btn" disabled={loading}>
//               {loading ? "Creating account..." : "Create Account"}
//             </button>
//           </form>

//           <p className="switch-auth">
//             Already have an account?{" "}
//             <span onClick={() => navigate("/login")}>Login</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserSignup;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserSignup.css";

function UserSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/users/register", {
        fullname: { firstname: form.firstname, lastname: form.lastname },
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("role", "user");

      // Send welcome email
      try {
        await emailjs.send(
          "service_al5yitk",
          "template_rp23wih",
          {
            from_name: "VitalTrip",
            to_email: form.email,
            message: `Welcome ${form.firstname}! Your VitalTrip account is ready. ✈️`,
          },
          "N3wkfGFUrmWRSm_AQ"
        );
      } catch (err) {
        console.warn("EmailJS send failed:", err);
      }

      toast.success("🎉 Registration successful!", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        window.dispatchEvent(new Event("storage"));
        navigate("/");
      }, 2200);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed. Try again.", {
        position: "top-center",
        autoClose: 2500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-section">
      <ToastContainer />
      <div className="signup-container">
        <button className="close-btn" onClick={() => navigate("/")}>×</button>

        {/* LEFT IMAGE */}
        <div className="signup-left">
          <img
            src="https://img.freepik.com/free-vector/travel-concept-illustration_114360-835.jpg"
            alt="Signup Illustration"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="signup-right">
          <h2>
            Join <span>VitalTrip</span>
          </h2>
          <p className="subtitle">
            Plan your adventures smarter — start your journey today ✈️
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                name="firstname"
                placeholder="First Name"
                value={form.firstname}
                onChange={handleChange}
                required
              />
              <input
                name="lastname"
                placeholder="Last Name"
                value={form.lastname}
                onChange={handleChange}
              />
            </div>

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="switch-auth">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;

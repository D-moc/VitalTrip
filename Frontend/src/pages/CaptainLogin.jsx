// import React, { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import api from "../utils/api";
// import AuthCard from "../components/AuthCard";
// import { AuthContext } from "../context/AuthContext";

// const CaptainLogin = () => {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await api.post("/captains/login", form);
//       const { token, captain } = res.data;
//       if (!token) throw new Error("Login failed");

//       localStorage.setItem("captainToken", token);
//       await login(form, "captain");
//       navigate("/"); 
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#004e92] to-[#000428] text-white">
//       <AuthCard title="Captain Login" subtitle="Authorized personnel only">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
//           />
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             className="w-full py-3 bg-linear-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold shadow-lg hover:shadow-cyan-400/40 transition-all"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </motion.button>
//         </form>
//         <p className="text-center mt-4 text-white/80">
//           New Admin?{" "}
//           <Link to="/captain/signup" className="text-cyan-300 hover:underline font-medium">
//             Register here
//           </Link>
//         </p>
//       </AuthCard>
//     </div>
//   );
// };

// export default CaptainLogin;

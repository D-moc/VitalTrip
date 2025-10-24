

// import React, { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import api from "../utils/api";
// import AuthCard from "../components/AuthCard";
// import { AuthContext } from "../context/AuthContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await api.post("/users/login", form);
//       const { token, user } = res.data;
//       if (!token) throw new Error("No token received");

//       // Use context login → instantly updates Navbar
//       await login(form, "user");
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
//       <AuthCard title="Welcome Back 👋" subtitle="Login to continue your journey">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-400"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-400"
//           />
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white font-semibold shadow-lg hover:shadow-pink-500/40 transition-all"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </motion.button>
//         </form>
//         <p className="text-center mt-4 text-white/80">
//           Don’t have an account?{" "}
//           <Link to="/signup" className="text-pink-400 hover:underline font-medium">
//             Sign up
//           </Link>
//         </p>
//       </AuthCard>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import AuthCard from "../components/AuthCard";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/users/login", form);
      const { token, user } = res.data;
      if (!token) throw new Error("No token received");

      // ✅ Save token for authenticated API requests
      localStorage.setItem("authToken", token);

      // ✅ Update AuthContext instantly
      await login(user, "user");

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
      <AuthCard title="Welcome Back 👋" subtitle="Login to continue your journey">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-400"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white font-semibold shadow-lg hover:shadow-pink-500/40 transition-all"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="text-center mt-4 text-white/80">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-pink-400 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </AuthCard>
    </div>
  );
};

export default Login;

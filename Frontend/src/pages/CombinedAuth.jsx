import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import AuthCard from "../components/AuthCard";
import { AuthContext } from "../context/AuthContext";

const CombinedAuth = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isCaptain, setIsCaptain] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    accessKey: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isCaptain
        ? isLogin
          ? "/captains/login"
          : "/captains/register"
        : isLogin
        ? "/users/login"
        : "/users/register";

      const payload = isCaptain
        ? isLogin
          ? { email: form.email, password: form.password }
          : {
              fullname: { firstname: form.firstname, lastname: form.lastname },
              email: form.email,
              password: form.password,
              accessKey: form.accessKey,
            }
        : isLogin
        ? { email: form.email, password: form.password }
        : {
            fullname: { firstname: form.firstname, lastname: form.lastname },
            email: form.email,
            password: form.password,
          };

      const res = await api.post(endpoint, payload);
      const { token, user, captain } = res.data;

      if (!token) throw new Error("Authentication failed");

      localStorage.setItem(
        isCaptain ? "captainToken" : "authToken",
        token
      );

      await login(isCaptain ? captain || form : user || form, isCaptain ? "captain" : "user");

      navigate(isCaptain ? "/captain/dashboard" : "/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <AuthCard
        title={isCaptain ? "Captain Portal ⚓" : "Welcome Back 👋"}
        subtitle={
          isCaptain
            ? "Manage your team and destinations"
            : "Plan your next adventure"
        }
      >
        {/* Tabs */}
        <div className="flex justify-center mb-4 bg-white/10 rounded-lg overflow-hidden">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 font-semibold ${
              isLogin ? "bg-white/20 text-white" : "text-white/60"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 font-semibold ${
              !isLogin ? "bg-white/20 text-white" : "text-white/60"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Role Switch */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsCaptain(!isCaptain)}
            className="text-cyan-300 hover:underline font-medium text-sm"
          >
            {isCaptain
              ? "Switch to User Mode"
              : "Captain Access (Admin Login)"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="flex gap-2">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={form.firstname}
                onChange={handleChange}
                className="w-1/2 p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={form.lastname}
                onChange={handleChange}
                className="w-1/2 p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {!isLogin && isCaptain && (
            <input
              type="text"
              name="accessKey"
              placeholder="Captain Access Key"
              value={form.accessKey}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold shadow-lg transition-all ${
              isCaptain
                ? "bg-gradient-to-r from-teal-500 to-cyan-500"
                : "bg-gradient-to-r from-pink-500 to-purple-500"
            } hover:shadow-cyan-400/40`}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Creating account..."
              : isLogin
              ? "Login"
              : "Sign Up"}
          </motion.button>
        </form>
      </AuthCard>
    </div>
  );
};

export default CombinedAuth;

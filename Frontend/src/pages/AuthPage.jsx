//src/pages/AuthPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaMountain } from "react-icons/fa";
import api from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    adminKey: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isAdmin
        ? isLogin
          ? "/captains/login"
          : "/captains/register"
        : isLogin
        ? "/users/login"
        : "/users/register";

      const payload = isAdmin
        ? isLogin
          ? { email: form.email, password: form.password }
          : {
              fullname: { firstname: form.firstname, lastname: form.lastname },
              email: form.email,
              password: form.password,
              accessKey: form.adminKey, // optional key field for admins
            }
        : isLogin
        ? { email: form.email, password: form.password }
        : {
              fullname: { firstname: form.firstname, lastname: form.lastname },
              email: form.email,
              password: form.password,
            };

      const res = await api.post(endpoint, payload);

      if (res.status === 200 || res.status === 201) {
        toast.success(`${isLogin ? "Login" : "Registration"} successful! 🎉`);

        const token = res.data.token;

        if (isAdmin) {
          localStorage.setItem("captainToken", token);
          navigate("/captain/dashboard");
        } else {
          localStorage.setItem("userToken", token);
          navigate("/");
        }
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Something went wrong. Try again.";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-white font-poppins">
      <motion.div
        className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-[90%] max-w-md border border-cyan-100"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Logo */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <FaMountain className="text-orange-500 text-3xl" />
          <h1 className="text-2xl font-extrabold text-gray-800">
            Vital<span className="text-cyan-500">Trip</span>
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
          {isAdmin ? "Admin Access" : "Welcome"}
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          {isAdmin
            ? "Admin portal - Manage destinations and trips"
            : "Start your journey to discover Maharashtra"}
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-6 bg-gray-100 rounded-xl overflow-hidden">
          <button
            className={`w-1/2 py-2 font-semibold transition-all ${
              isLogin
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 font-semibold transition-all ${
              !isLogin
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          key={isLogin ? "login" : "register"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {!isLogin && (
            <div className="flex gap-3">
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
              <input
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
          )}

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cyan-500 outline-none"
          />

          {!isLogin && isAdmin && (
            <input
              type="text"
              name="adminKey"
              value={form.adminKey}
              onChange={handleChange}
              placeholder="Enter Admin Access Key"
              className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-400 outline-none"
            />
          )}

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </motion.form>

        {/* Switch Options */}
        <div className="text-center mt-6 text-sm">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="text-gray-600 font-semibold hover:text-cyan-600 transition"
          >
            {isAdmin ? "Switch to User Login" : "Admin Login"}
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="text-cyan-600 hover:underline text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;

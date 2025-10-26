// src/pages/CaptainResetPassword.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import AuthCard from "../components/AuthCard";

const CaptainResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirm) {
      setMessage("❌ Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(`/captains/reset-password/${token}`, { password });
      setSuccess(true);
      setMessage("✅ Password reset successful! Redirecting...");
      setTimeout(() => navigate("/"), 2500);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003366] via-[#006666] to-[#00b4d8] text-white">
      <AuthCard title="Captain Password Reset ⚓" subtitle="Set a new secure password">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
          />
          {message && (
            <p className={`text-center text-sm ${success ? "text-green-300" : "text-red-400"}`}>
              {message}
            </p>
          )}
          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg text-white font-semibold shadow-lg hover:shadow-cyan-400/40 transition-all"
          >
            {loading ? "Updating..." : "Reset Password"}
          </motion.button>
        </form>
      </AuthCard>
    </div>
  );
};

export default CaptainResetPassword;

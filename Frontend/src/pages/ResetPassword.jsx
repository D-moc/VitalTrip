import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import AuthCard from "../components/AuthCard";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isCaptain = location.pathname.includes("/captain/reset-password");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(null);

  // ✅ Verify token on page load
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const endpoint = isCaptain
          ? `/captains/verify-reset/${token}`
          : `/users/verify-reset/${token}`;
        const res = await api.get(endpoint);
        setValidToken(res.data.valid);
      } catch {
        setValidToken(false);
      }
    };
    verifyToken();
  }, [token, isCaptain]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) return alert("Password must be at least 6 characters long");
    if (password !== confirm) return alert("Passwords do not match");

    setLoading(true);
    try {
      const endpoint = isCaptain
        ? "/captains/reset-password"
        : "/users/reset-password";

      const res = await api.post(endpoint, { token, newPassword: password });
      alert(res.data.message || "Password reset successful!");
      navigate(isCaptain ? "/captain/login" : "/login");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🎯 UI States
  if (validToken === null)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700">
        <p>Verifying your reset link...</p>
      </div>
    );

  if (validToken === false)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-700">
        <h2 className="text-3xl font-bold mb-2">⚠️ Link Expired</h2>
        <p className="text-gray-600 mb-4">
          This reset link is invalid or has expired.
        </p>
        <button
          onClick={() =>
            navigate(isCaptain ? "/captain/login" : "/login")
          }
          className="px-5 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
        >
          Back to Login
        </button>
      </div>
    );

  return (
    <div
      className={`min-h-screen flex items-center justify-center text-white ${
        isCaptain
          ? "bg-linear-to-br from-[#004e92] to-[#000428]"
          : "bg-linear-to-br from-[#3a0ca3] via-[#7209b7] to-[#f72585]"
      }`}
    >
      <AuthCard
        title="Reset Password 🔑"
        subtitle="Enter your new password below"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-pink-400"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full py-3 bg-linear-to-r from-pink-500 to-purple-500 rounded-lg text-white font-semibold shadow-lg hover:shadow-pink-500/40 transition-all"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </motion.button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() =>
              navigate(isCaptain ? "/captain/login" : "/login")
            }
            className="text-pink-300 hover:underline text-sm"
          >
            ← Back to Login
          </button>
        </div>
      </AuthCard>
    </div>
  );
};

export default ResetPassword;

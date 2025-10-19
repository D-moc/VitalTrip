import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  // 🔒 If no token → redirect to login
  if (!token) {
    return <Navigate to={role === "captain" ? "/captain-login" : "/login"} />;
  }

  // 🔐 If logged in but role mismatch → block access
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  // ✅ Authorized access
  return children;
}

export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute component
 * - Checks if token exists in localStorage
 * - Optionally verifies user role (if passed as prop)
 */
function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  // If no token found → redirect to appropriate login page
  if (!token) {
    return (
      <Navigate
        to={allowedRole === "captain" ? "/captain-login" : "/login"}
        replace
      />
    );
  }

  // If allowedRole specified but doesn’t match → block access
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

import React, { createContext, useEffect, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken =
      localStorage.getItem("userToken") || localStorage.getItem("authToken");
    const captainToken = localStorage.getItem("captainToken");
    const token = captainToken || userToken;

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        console.log("🔑 Checking token...");

        if (captainToken) {
          try {
            const res = await api.get("/captains/profile", {
              headers: { Authorization: `Bearer ${captainToken}` },
            });
            if (res.data?.captain) {
              setUser(res.data.captain);
              setRole("captain");
              console.log("Captain authenticated:", res.data.captain);
              return;
            }
          } catch {
            console.warn("Captain token invalid, falling back to user.");
          }
        }

  
        const res = await api.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.user) {
          setUser(res.data.user);
          setRole(res.data.user.role || "user");
          console.log("User authenticated:", res.data.user);
        }
      } catch (err) {
        console.warn("Invalid token, clearing storage:", err.message);
        localStorage.removeItem("userToken");
        localStorage.removeItem("authToken");
        localStorage.removeItem("captainToken");
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);


  const login = async (credentials, roleType = "user") => {
    try {
      const endpoint =
        roleType === "captain" ? "/captains/login" : "/users/login";

      const res = await api.post(endpoint, credentials);
      const { token, user: userData, captain } = res.data;

      if (!token) throw new Error("Token not provided by server.");

      if (roleType === "captain") {
        localStorage.setItem("captainToken", token);
        localStorage.removeItem("userToken");
      } else {
        localStorage.setItem("userToken", token);
        localStorage.removeItem("captainToken");
      }

      const activeUser = userData || captain || null;
      setUser(activeUser);
      setRole(userData ? "user" : "captain");

      localStorage.setItem("user", JSON.stringify(activeUser));
      localStorage.setItem("role", userData ? "user" : "captain");

      toast.success(
        `Welcome back, ${
          activeUser?.fullname?.firstname || activeUser?.firstname || "Traveler"
        }!`
      );

      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("authToken");
    localStorage.removeItem("captainToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setUser(null);
    setRole(null);
    toast.info("Logged out successfully!");
    navigate("/");
  };

  const refreshUser = async () => {
    try {
      const token =
        localStorage.getItem("userToken") || localStorage.getItem("authToken");
      if (!token) return;

      const res = await api.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.user) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log("User profile refreshed:", res.data.user);
      }
    } catch (err) {
      console.error("Error refreshing user:", err);
    }
  };

  const refreshCaptain = async () => {
    try {
      const token = localStorage.getItem("captainToken");
      if (!token) return;

      const res = await api.get("/captains/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.captain) {
        setUser(res.data.captain);
        localStorage.setItem("user", JSON.stringify(res.data.captain));
        console.log("Captain profile refreshed:", res.data.captain);
      }
    } catch (err) {
      console.error("Error refreshing captain:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        login,
        logout,
        refreshUser,
        refreshCaptain,
        setUser,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

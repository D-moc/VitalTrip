import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Captain from "../models/captain.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";


const extractToken = (req) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  if (req.cookies?.token) {
    return req.cookies.token;
  }

  return null;
};


export const authUser = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      console.log("[authUser] No token provided");
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    //blacklist check
    const blacklisted = await blacklistTokenModel.findOne({ token });
    if (blacklisted) {
      console.log("[authUser] Token blacklisted");
      return res.status(401).json({ success: false, message: "Token blacklisted" });
    }

  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    if (!user) {
      console.log("[authUser] User not found for token");
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    console.log(`[authUser] Authenticated user: ${user.fullname || user.email}`);
    next();
  } catch (err) {
    console.error("[authUser] Error:", err.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      error: err.message,
    });
  }
};

export const authCaptain = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      console.log("[authCaptain] No token provided");
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    //blacklist check
    const blacklisted = await blacklistTokenModel.findOne({ token });
    if (blacklisted) {
      console.log("[authCaptain] Token blacklisted");
      return res.status(401).json({ success: false, message: "Token blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const captain = await Captain.findById(decoded._id);
    if (!captain) {
      console.log("[authCaptain] Captain not found for token");
      return res.status(403).json({ success: false, message: "Captain not found" });
    }

    req.captain = captain;
    console.log(`[authCaptain] Authenticated captain: ${captain.fullname || captain.email}`);
    next();
  } catch (err) {
    console.error("[authCaptain] Error:", err.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      error: err.message,
    });
  }
};

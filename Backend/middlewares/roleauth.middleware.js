const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model");
const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");

// 🔒 Middleware: Captain-Only Access
exports.verifyCaptainAccess = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // Check if token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Blacklisted token" });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verify it's a Captain account
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(403).json({
        message: "Access denied — Captain credentials required",
      });
    }

    req.captain = captain; // Attach captain data for use
    next();
  } catch (err) {
    console.error("Captain access error:", err);
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

// 🚫 Middleware: User Cannot Access Captain Routes
exports.preventUserAccess = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (user) {
      return res.status(403).json({
        message: "User access restricted for this route",
      });
    }

    next();
  } catch (err) {
    console.error("User restriction error:", err);
    res.status(401).json({ message: "Unauthorized request" });
  }
};

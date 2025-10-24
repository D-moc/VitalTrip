// // middlewares/roleAuth.middleware.js
// import jwt from "jsonwebtoken";
// import Captain from "../models/captain.model.js";
// import blacklistTokenModel from "../models/blacklistToken.model.js";

// export const verifyCaptainAccess = async (req, res, next) => {
//   try {
//     const token =
//       req.cookies?.token || req.headers.authorization?.split(" ")[1];

//     if (!token)
//       return res.status(401).json({ message: "Unauthorized: No token" });

//     const isBlacklisted = await blacklistTokenModel.findOne({ token });
//     if (isBlacklisted)
//       return res.status(401).json({ message: "Token blacklisted" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const captain = await Captain.findById(decoded._id);

//     if (!captain)
//       return res.status(403).json({ message: "Access denied: Captain required" });

//     req.captain = captain;
//     next();
//   } catch (err) {
//     console.error("verifyCaptainAccess error:", err);
//     res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
//   }
// };


import jwt from "jsonwebtoken";
import Captain from "../models/captain.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

/* -------------------------------------------------------------------------- */
/* 🛡️ verifyCaptainAccess - JWT Auth for Captains */
/* -------------------------------------------------------------------------- */
export const verifyCaptainAccess = async (req, res, next) => {
  try {
    // 1️⃣ Extract Token from Header or Cookie
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "Unauthorized: No token provided" });

    // 2️⃣ Check Blacklist
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted)
      return res.status(401).json({ message: "Token has been revoked" });

    // 3️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Validate Captain Exists
    const captain = await Captain.findById(decoded.id || decoded._id).select(
      "-password"
    );

    if (!captain)
      return res
        .status(403)
        .json({ message: "Access denied: Captain account not found" });

    // 5️⃣ Attach to Request (Unified Field)
    req.user = captain; // ✅ Used in controllers (consistent naming)
    req.captain = captain; // ✅ Backward compatibility

    next();
  } catch (err) {
    console.error("❌ verifyCaptainAccess error:", err);
    res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
      error: err.message,
    });
  }
};

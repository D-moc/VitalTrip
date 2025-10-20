// const userModel = require('../models/user.model');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const blacklistTokenModel = require('../models/blacklistToken.model');
// const captainModel = require('../models/captain.model');

// module.exports.authUser = async (req, res, next) => {
//     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const isBlacklisted = await blacklistTokenModel.findOne({ token: token });

//     if (isBlacklisted) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }   

//     try{

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await userModel.findById(decoded._id);

//         req.user = user;

//         return next();

//     } catch(err){
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
// }

// module.exports.authCaptain = async (req, res, next) => {
//     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];   

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }     

//     const isBlacklisted = await blacklistTokenModel.findOne({ token: token });

//     if (isBlacklisted) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     try{

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const captain = await captainModel.findById(decoded._id);  
//         req.captain = captain; 
//         return next();  
//     }catch(err){
//         return res.status(401).json({ message: 'Unauthorized' });
//     }   
      
// }

// middlewares/auth.middlewares.js
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

// 🧍 Authenticate Normal User
module.exports.authUser = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token found" });
    }

    // Check if token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized: Blacklisted token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid user" });
    }

    req.user = user; // ✅ attach user to request
    next();
  } catch (err) {
    console.error("Auth Error:", err);
    res.status(401).json({ message: "Unauthorized or invalid token" });
  }
};

// 🚗 Authenticate Captain
module.exports.authCaptain = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token found" });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized: Blacklisted token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);

    if (!captain) {
      return res.status(401).json({ message: "Unauthorized: Invalid captain" });
    }

    req.captain = captain;
    next();
  } catch (err) {
    console.error("Captain Auth Error:", err);
    res.status(401).json({ message: "Unauthorized or invalid token" });
  }
};

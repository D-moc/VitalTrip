// const userModel = require('../models/user.model');
// const userService = require('../services/user.service');
// const { validationResult } = require('express-validator');
// const blacklistTokenModel = require('../models/blacklistToken.model');


// module.exports.registerUser = async (req, res,) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     console.log(req.body);


//     const { fullname, email, password } = req.body;
    
//     const isUserAlreadyExist = await userModel.findOne({ email });
//     if (isUserAlreadyExist) {
//         return res.status(409).json({ message: 'User already exists' });
//     }
    

//     const hashedPassword = await userModel.hashPassword(password);

//     const user = await userService.createUser({
//         firstname: fullname.firstname,
//         lastname: fullname.lastname,
//         email,
//         password: hashedPassword
//     });

//     const token = user.generateAuthToken();

//     res.status(201).json({token,user});
    
// }

// module.exports.loginUser = async (req, res) => {

//     const errors = validationResult(req);               
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }       
//     const { email, password } = req.body; 

//     const user = await userModel.findOne({ email }).select('+password');
//     if (!user) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//     }
    

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//     }
//     const token = user.generateAuthToken();

//     res.cookie('token', token);

//     res.status(200).json({ token, user });

// }

// module.exports.getUserProfile = async (req, res) => {
//    res.status(200).json({ user: req.user });
// }   

// module.exports.logoutUser = async (req, res) => {
//     res.clearCookie('token');
//     const token = req.cookies.token || req.headers.authorization.split(' ')[1];

//     await blacklistTokenModel.create({ token });

//     res.status(200).json({ message: 'Logged out successfully' });
// }   



// const userModel = require('../models/user.model');
// const userService = require('../services/user.service');
// const { validationResult } = require('express-validator');
// const blacklistTokenModel = require('../models/blacklistToken.model');

// module.exports.registerUser = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { fullname, email, password } = req.body;

//   const isUserAlreadyExist = await userModel.findOne({ email });
//   if (isUserAlreadyExist) {
//     return res.status(409).json({ message: 'User already exists' });
//   }

//   const hashedPassword = await userModel.hashPassword(password);

//   const user = await userService.createUser({
//     firstname: fullname.firstname,
//     lastname: fullname.lastname,
//     email,
//     password: hashedPassword,
//   });

//   const token = user.generateAuthToken();

//   res.status(201).json({
//     token,
//     role: 'user', // ✅ added
//     user,
//   });
// };

// module.exports.loginUser = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { email, password } = req.body;

//   const user = await userModel.findOne({ email }).select('+password');
//   if (!user) {
//     return res.status(401).json({ message: 'Invalid email or password' });
//   }

//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) {
//     return res.status(401).json({ message: 'Invalid email or password' });
//   }

//   const token = user.generateAuthToken();

//   res.cookie('token', token);
//   res.status(200).json({
//     token,
//     role: 'user', // ✅ added
//     user,
//   });
// };

// module.exports.getUserProfile = async (req, res) => {
//   res.status(200).json({ user: req.user });
// };

// module.exports.logoutUser = async (req, res) => {
//   res.clearCookie('token');
//   const token = req.cookies.token || req.headers.authorization.split(' ')[1];

//   await blacklistTokenModel.create({ token });

//   res.status(200).json({ message: 'Logged out successfully' });
// };

// // ✅ Upload profile image
// module.exports.uploadProfileImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const imageUrl = `/uploads/${req.file.filename}`;

//     // Update user in DB
//     await userModel.findByIdAndUpdate(req.user._id, { profileImage: imageUrl });

//     return res.status(200).json({ imageUrl });
//   } catch (error) {
//     console.error("Upload failed:", error);
//     res.status(500).json({ message: "Upload failed" });
//   }
// };



const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

// ✅ REGISTER USER
module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  try {
    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({
      token,
      role: "user",
      user,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// ✅ LOGIN USER
module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token);
    res.status(200).json({
      token,
      role: "user",
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ✅ GET USER PROFILE
module.exports.getUserProfile = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ LOGOUT USER
module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
};

// ✅ UPLOAD PROFILE IMAGE (WORKING)
// ✅ UPLOAD PROFILE IMAGE (FINAL WORKING)
module.exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const imageUrl = `uploads/${req.file.filename}`;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      { profileImage: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      imageUrl, // ✅ matches frontend
      message: "Profile image uploaded successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile image upload error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during image upload",
      error: error.message,
    });
  }
};


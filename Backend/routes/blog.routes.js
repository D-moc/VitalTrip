// import express from "express";
// import upload from "../middlewares/upload.middleware.js";
// import { authUser } from "../middlewares/auth.middleware.js";
// import { verifyCaptainAccess } from "../middlewares/roleAuth.middleware.js";
// import {
//   createBlog,
//   getAllBlogs,
//   getBlogById,
//   getPendingBlogs,
//   approveBlog,
//   deleteBlog,
// } from "../controllers/blog.controller.js";

// const router = express.Router();

// // 📝 Create new blog (User or Captain)
// router.post("/create", upload.single("image"), authUser, createBlog);

// // 🌍 Get all approved blogs (Public)
// router.get("/", getAllBlogs);

// // 🔍 Get single blog by ID
// router.get("/:id", getBlogById);

// // 🧾 Captain routes
// router.get("/pending/all", verifyCaptainAccess, getPendingBlogs);
// router.put("/approve/:id", verifyCaptainAccess, approveBlog);
// router.delete("/:id", verifyCaptainAccess, deleteBlog);

// export default router;

import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { verifyCaptainAccess } from "../middlewares/roleAuth.middleware.js";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  getPendingBlogs,
  approveBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

// 📝 Create new blog (User or Captain)
router.post("/create", upload.single("image"), authUser, createBlog);

// 🌍 Get all approved blogs (Public)
router.get("/", getAllBlogs);

// 🧾 Captain routes — must come BEFORE "/:id"
router.get("/pending/all", verifyCaptainAccess, getPendingBlogs);
router.put("/approve/:id", verifyCaptainAccess, approveBlog);
router.delete("/:id", verifyCaptainAccess, deleteBlog);

// 🔍 Get single blog by ID (Public)
router.get("/:id", getBlogById);

export default router;

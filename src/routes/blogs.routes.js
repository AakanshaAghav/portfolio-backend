const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const blogs = require("../controllers/blogs.controller");

// Public
router.get("/", blogs.getBlogs);
router.get("/:slug", blogs.getBlogBySlug);

// Admin
router.post("/", auth, blogs.createBlog);
router.put("/:id", auth, blogs.updateBlog);
router.delete("/:id", auth, blogs.deleteBlog);

module.exports = router;

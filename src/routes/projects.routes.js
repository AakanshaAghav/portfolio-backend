const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const projects = require("../controllers/projects.controller");

router.post("/", auth, projects.createProject);
router.get("/", projects.getProjects);
router.put("/:id", auth, projects.updateProject);
router.delete("/:id", auth, projects.deleteProject);

module.exports = router;

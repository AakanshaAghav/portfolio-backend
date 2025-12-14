const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const skills = require("../controllers/skills.controller");

router.post("/", auth, skills.createSkill);
router.get("/", skills.getSkills);
router.put("/:id", auth, skills.updateSkill);
router.delete("/:id", auth, skills.deleteSkill);

module.exports = router;

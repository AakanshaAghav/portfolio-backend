const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const exp = require("../controllers/experience.controller");

// Public
router.get("/", exp.getExperience);

// Admin
router.post("/", auth, exp.createExperience);
router.put("/:id", auth, exp.updateExperience);
router.delete("/:id", auth, exp.deleteExperience);

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const about = require("../controllers/about.controller");

router.get("/", about.getAbout);
router.put("/", auth, about.updateAbout);

module.exports = router;

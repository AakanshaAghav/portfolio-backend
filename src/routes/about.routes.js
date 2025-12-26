const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const upload = require("../config/multer");
const about = require("../controllers/about.controller");

router.get("/", about.getAbout);
router.put("/", auth,  upload.single("image"), about.updateAbout);

module.exports = router;

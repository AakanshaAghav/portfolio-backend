const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const media = require("../controllers/media.controller");

router.get("/", auth, media.getMedia);
router.delete("/:id", auth, media.deleteMedia);

module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const auth = require("../middlewares/auth.middleware");
const { uploadImage } = require("../controllers/upload.controller");

router.post(
  "/image",
  auth,
  upload.single("image"),
  uploadImage
);

module.exports = router;

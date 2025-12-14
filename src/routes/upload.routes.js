const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const auth = require("../middlewares/auth.middleware");
const supabase = require("../config/supabase");

router.post(
  "/image",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const file = req.file;
      const fileName = `projects/${Date.now()}-${file.originalname}`;

      const { error } = await supabase.storage
        .from("project-images")
        .upload(fileName, file.buffer, {
          contentType: file.mimetype
        });

      if (error) throw error;

      const { data } = supabase.storage
        .from("project-images")
        .getPublicUrl(fileName);

      res.json({ imageUrl: data.publicUrl });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;

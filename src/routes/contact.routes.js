const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const contact = require("../controllers/contact.controller");

/* Public */
router.get("/", contact.getContact);

/* Admin */
router.post("/", auth, contact.upsertContact);

module.exports = router;

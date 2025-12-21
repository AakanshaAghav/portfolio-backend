const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const service = require("../controllers/services.controller");

// Public
router.get("/", service.getServices);

// Admin
router.post("/", auth, service.createService);
router.put("/:id", auth, service.updateService);
router.delete("/:id", auth, service.deleteService);

module.exports = router;

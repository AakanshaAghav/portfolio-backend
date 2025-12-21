const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const testimonial = require("../controllers/testimonials.controller");

// Public
router.get("/", testimonial.getTestimonials);

// Admin
router.post("/", auth, testimonial.createTestimonial);
router.put("/:id", auth, testimonial.updateTestimonial);
router.delete("/:id", auth, testimonial.deleteTestimonial);

module.exports = router;

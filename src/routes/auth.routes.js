const router = require("express").Router();
const { login } = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/login", login);

router.get("/protected", auth, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

module.exports = router;

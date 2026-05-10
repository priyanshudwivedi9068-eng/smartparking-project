const express = require("express");
const router = express.Router();
const {
  signup,
  verifyOtp,
  login,
  googleLogin,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/verify", verifyOtp);
router.post("/login", login);
router.post("/google", googleLogin);

module.exports = router;

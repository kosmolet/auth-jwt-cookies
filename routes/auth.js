const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controllers/auth");

router.post("/register", register);

router.post("/login", login);

router.post("/forgotpassword", forgotPassword);

router.put("/resetpassword/:resetToken", resetPassword);

router.get("/logout", logout);

module.exports = router;

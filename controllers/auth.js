const crypto = require("crypto");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const maxAge = 3 * 24 * 60 * 60;

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: "User with this email already exists. Please login instead",
      });
    }

    user = new User({
      username,
      email,
      password,
    });

    const newUser = await user.save();

    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, error: "Please provide email and password" });
  }
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Email or password are invalid" });
    }

    const isPasswordMatch = await user.validatePassword(password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Email or password are invalid" });
    }

    const token = user.getSignedJwtToken();
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ success: true, token, user });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

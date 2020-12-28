const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { JWT_SECRET } = process.env;

const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Email or password are invalid" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ erorr: "Email or password are invalid" });
    }

    const payload = {
      user: {
        userId: user._id,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.status(200).json({ token, payload });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    const newUser = await user.save();
    const payload = {
      userId: newUser._id,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.status(201).json({ token, payload });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

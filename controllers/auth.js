const crypto = require("crypto");
const User = require("../models/User");
const sendVerifyEmail = require("../utils/sendMail");

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

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.status(200).json({
      success: true,
      user: { _id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        error:
          "Email could not be sent. Please check that email address is correct",
      });
    }

    const resetPasswordToken = user.getResetPasswordToken();
    await user.save();

    const data = {
      to: user.email,
      name: user.username,
      resetPath: `/resetpassword/${resetPasswordToken}`,
    };
    await sendVerifyEmail(data);
    res.status(200).json({
      success: true,
      data: `Email was sent to ${email}. Please check your inbox`,
    });
  } catch (err) {
    const user = await User.findOne({ email });
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        error:
          "Your reset passport session is expired or invalid. Try to login or reset password again",
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    const token = user.getSignedJwtToken();
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(201).json({
      success: true,
      data: "Password has been updated ",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(201).json({
    success: true,
  });
};

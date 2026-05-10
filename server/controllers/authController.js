const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(
  "4818592653-15kp948bu77jltuuber81llk1iq8hgd3.apps.googleusercontent.com",
);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const sendOtp = async (user, email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60000);
  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "SpotSync Verification OTP",
      text: `Your OTP for SpotSync is: ${otp}. It is valid for 10 minutes.`
    });
  } else {
    console.log(`OTP for ${email} is: ${otp}`);
  }
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user && user.isVerified) return res.status(400).json({ message: "User already exists." });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (user) {
      user.password = hashedPassword;
      user.name = name;
    } else {
      user = new User({ name, email, password: hashedPassword, isVerified: false });
    }
    await sendOtp(user, email);
    res.json({ success: true, message: "OTP sent to email." });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found." });
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );
    res.json({ success: true, user, token, message: "Verification successful!" });
  } catch (error) {
    res.status(500).json({ message: "Verification failed." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });
    await sendOtp(user, email);
    res.json({ success: true, message: "OTP sent to email." });
  } catch (error) {
    res.status(500).json({ message: "Login failed." });
  }
};
exports.googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience:
        "4818592653-15kp948bu77jltuuber81llk1iq8hgd3.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10),
        isVerified: true,
      });
    } else if (!user.isVerified) {
      user.isVerified = true;
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();
    }

    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" },
    );
    res.json({ success: true, user, token: jwtToken });
  } catch (error) {
    console.error("Google Login Error:", error);
    res
      .status(400)
      .json({ success: false, message: "Google verification failed." });
  }
};

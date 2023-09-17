const bcrypt = require("bcryptjs");
const User = require("../models/user/userModel");
const RefreshToken = require("../models/user/RefreshToken");
const passport = require("passport");
const { generateAccessToken, createRefreshToken } = require("../helpers/token");
const emailService = require("../helpers/emailService");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email);
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    
    console.log("id",user.id);
    const accessToken = generateAccessToken(user);
    const refreshToken = await createRefreshToken(user);
    console.log(refreshToken);

    res.json({ accessToken, refreshToken, });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = await createRefreshToken(user);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    await RefreshToken.findOneAndDelete({ token: refreshToken });
    res.sendStatus(204);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("User with given email doesn't exist");
  }
  const resetToken = bcrypt.genSaltSync(10);
  await user.updateOne({
    $set: {
      resetToken,
      resetTokenExpires: new Date().getTime() + 60 * 60 * 1000, // 1 hour
    },
  });
  const mailOptions = {
    from: "aak201610885@gmail.com",
    to: user.email,
    subject: "Password Reset Request",
    html: `<!DOCTYPE html>
    <html>
    <head>
      <title>Password Reset</title>
    </head>
    <body>
      <h1>Password Reset</h1>
      <p>Hi <b>${user.email}</b>,</p>
      <p>You have requested to reset your password. To reset your password, click on the following link:</p>
      <a href="http://10.0.75.1:3000/reset/${resetToken}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you did not request to reset your password, please ignore this email.</p>
      <p>Thank you</p>
      <p>The Team</p>
    </body>
    </html>`,
  };
  await emailService.sendMail(mailOptions);
  res
    .status(200)
    .send("A password reset link has been sent to your email address.");
};

const resetPassword = async (req, res) => {
  const resetToken = req.body.resetToken;
  console.log("resetToken==>", resetToken);
  const user = await User.findOne({ resetToken });
  console.log("user is ==>", user);
  if (!user) {
    return res.status(400).send("Invalid reset token");
  }
  const { newPassword } = req.body;
  if (!newPassword) {
    return res.status(400).send("Please enter a new password");
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);
  await user.updateOne({
    $set: {
      password: hashedPassword,
      resetToken: "",
      resetTokenExpires: null,
    },
  });
  res.status(200).send("Your password has been reset.");
};

const authGoogle = passport.authenticate("google", { scope: ["profile"] });

const googleCallback = passport.authenticate("google", {
  successRedirect: "/protected",
  failureRedirect: "/auth/google/failure",
});

const logoutGoogle = (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
};

const AuthGoogleFailed = (req, res) => {
  res.send("Failed to authenticate..");
};

const getAllUser=async(req,res)=>{
  try {

    const user=await User.find()
    console.log(user);
    res.status(200).send(user)

  } catch (error) {
    res.status(500).send(error)
  }
}




const getUserByEmail=async(req,res)=>{
  try {

    
    const user=await User.find({
      _id: req.params.emailId,
    });
    res.status(200).send(user)
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
}

module.exports = {
  signup,
  login,
  logout,
  resetPassword,
  forgotPassword,
  authGoogle,
  googleCallback,
  logoutGoogle,
  AuthGoogleFailed,
  getAllUser,
  getUserByEmail
};

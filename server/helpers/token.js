
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/user/RefreshToken');
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
};




const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET);
};
const createRefreshToken = async (user) => {
  const token = generateRefreshToken(user);
  const refreshToken = new RefreshToken({ token, user: user.id });
  await refreshToken.save();
  return token;
};
module.exports={generateAccessToken,createRefreshToken}
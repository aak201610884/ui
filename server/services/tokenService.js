const jwt = require("jsonwebtoken");
const secretKey = process.env.ACCESS_TOKEN_SECRET; // Replace with your actual secret key
module.exports = {
  generateToken: (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour
  },
  verifyToken: (token) => {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      return null; // Token verification failed
    }
  },
};

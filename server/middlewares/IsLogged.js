function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
  console.log("userlogin");
}
module.exports = isLoggedIn;
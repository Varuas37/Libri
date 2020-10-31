module.exports = function (req, res, next) {
  if (req.user.role === 1) {
    return res.send("Unauthorized Route 🔐");
  }

  next();
};

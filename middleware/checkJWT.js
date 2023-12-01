const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    try {
      const user = await jwt.verify(token, process.env.SECRET_KEY);
      console.log(user);
      req.user = user.email;
      next();
    } catch {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  }
};

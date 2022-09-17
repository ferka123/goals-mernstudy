const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  const authData = req.headers.authorization;
  if (authData && authData.startsWith("Bearer")) {
    try {
      //get token from authdata
      const token = authData.split(" ")[1];
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from token
      req.user = await User.findById(decoded.id).select("-password");
      if(!req.user) {
        throw new Error("No user found");
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  } else {
    res.status(401);
    throw new Error("No auth data");
  }
});

module.exports = { protect };

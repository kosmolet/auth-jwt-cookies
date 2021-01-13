const jwt = require("jsonwebtoken");
const User = require('../models/User');
 
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized, Access Denied",
      });
    }
    
    const decrypt = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decrypt.id,
      email: decrypt.email,
    };
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized, Access Denied" });
  }
};

module.exports = verifyToken;
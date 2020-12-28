const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      error: "Unauthorized, Access Denied",
    });
  }

  try {
    const decodedToken = jwt.verify(authHeader, JWT_SECRET);
    req.userId = decodedToken.user._id;

    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized, Access Denied" });
  }
};

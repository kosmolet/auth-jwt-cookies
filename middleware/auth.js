const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(401).json({
      error: "Unauthorized, Access Denied",
    });
  }
  const bearerToken = bearerHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(bearerToken, JWT_SECRET);
    req.userId = decodedToken._id;

    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized, Access Denied" });
  }
};

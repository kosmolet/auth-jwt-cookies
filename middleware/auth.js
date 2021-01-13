const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
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
    };
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized, Access Denied" });
  }
};

module.exports = isAuthenticated;

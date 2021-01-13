const express = require("express");
const router = express.Router();
const { getUser } = require("../controllers/user");
const verifyToken = require("../middleware/auth");

router.get("/", verifyToken, getUser);

module.exports = router;

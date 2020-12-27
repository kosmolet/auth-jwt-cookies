const express = require("express");
const router = express.Router();

const Event = require("../models/Event");

router.get("/", (req, res) => {});
router.post("/", (req, res) => {});
router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

module.exports = router;

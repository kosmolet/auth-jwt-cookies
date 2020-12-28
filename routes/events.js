const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const isAuthenticated = require("../middleware/auth");

router.param("id", async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404).json({ message: "Event with this ID does NOT exist" });
    } else {
      req.event = event;
      req.id = req.params.id;

      next();
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", isAuthenticated, async (req, res) => {
  const { title, description, date } = req.body;

  try {
    const event = new Event({
      title,
      description,
      date,
    });

    const newEvent = await event.save();

    res.status(201).json({ event: newEvent });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/:id", isAuthenticated, async (req, res) => {
  const { title, description, date } = req.body;
  let updatedEvent = {};
  if (title && description && date) {
    updatedEvent = { title, description, date };
  }

  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { $set: updatedEvent },
    { new: true }
  );

  res.status(201).json({ event });
  try {
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    await Event.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Event was removed" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

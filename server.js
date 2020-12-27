const express = require("express");
const cors = require("cors");
const pino = require("pino");
const expressLogger = require("express-pino-logger");

const app = express();

const logger = pino({ level: process.env.LOG_LEVEL || "info" });
global.logger = logger;

if (["development", "production"].includes(process.env.NODE_ENV)) {
  app.use(expressLogger({ logger }));
}

app.use(express.json({ limit: "50mb" }));
app.use(cors());

// const auth = require("./routes/auth");
// const events = require("./routes/events");

app.get("/", (req, res) => {
  res.json({
    message: "api works",
  });
});

// app.use("/api/v1/auth", auth);
// app.use("/api/v1/events", events);

module.exports = app;

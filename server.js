const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const pino = require("pino");
const expressLogger = require("express-pino-logger");

const app = express();

const logger = pino({ level: process.env.LOG_LEVEL || "info" });
global.logger = logger;

if (["development", "production"].includes(process.env.NODE_ENV)) {
  app.use(expressLogger({ logger }));
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "API is working",
  });
});

app.use("/api/v1/auth", require("./routes/auth"));
// app.use("/api/v1/user", require("./routes/user"));

module.exports = app;

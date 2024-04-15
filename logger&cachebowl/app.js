require("dotenv").config();

const express = require("express");
const app = express();
const expressWinston = require("express-winston");
const { transports, format } = require("winston");
const logger = require("./logger");
const { cacheData, getCachedData } = require('./cache');

// Middleware to log requests
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);

// Middleware to log errors
const myFormat = format.printf(({ level, meta, timestamp }) => {
  return `${timestamp} ${level}: ${meta.message}`;
});

app.use(
  expressWinston.errorLogger({
    transports: [
      new transports.File({
        filename: "logsInternalErrors.log",
      }),
    ],
    format: format.combine(format.json(), format.timestamp(), myFormat),
  })
);

// Example routes
app.get("/", (req, res) => {
  // Example: Cache some data
  cacheData('exampleKey', 'exampleData');

  // Example: Retrieve cached data
  const cachedData = getCachedData('exampleKey');
  logger.info('Cached Data:', cachedData);

  logger.info("This is an info log");
  res.sendStatus(200);
});

app.get("/400", (req, res) => {
  logger.warn("This is a warning log");
  res.sendStatus(400);
});

app.get("/500", (req, res) => {
  res.sendStatus(500);
});

app.get("/error", (req, res) => {
  throw new Error("This is a custom error");
});

// Start server
app.listen(4000, () => {
  logger.info("Server started on port 4000");
});

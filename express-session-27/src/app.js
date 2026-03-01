const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const apiRoutes = require("./routes");
const logger = require("./middlewares/logger");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

function createApp() {
    const app = express();

    // Security
    app.use(helmet());

    // Rate limit
    app.use(
        rateLimit({
            windowMs: 60 * 1000,
            limit: 120,
            standardHeaders: true,
            legacyHeaders: false,
        })
    );

    // CORS
    app.use(cors({ origin: true }));

    // Body parsers
    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded({ extended: true }));

    // Logger examples
    app.use(logger);      // custom logger (teaching)
    app.use(morgan("dev")); // professional logger

    // Root
    app.get("/", (_req, res) => res.send("Session 27 - Controllers & Middleware"));

    // API
    app.use("/api", apiRoutes);

    // Not found + Error handler
    app.use(notFound);
    app.use(errorHandler);

    return app;
}

module.exports = createApp;
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const apiRoutes = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

function createApp() {
    const app = express();

    // Security headers
    app.use(helmet());

    // Rate limit (basic)
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

    // Logger
    app.use(morgan("dev"));

    // Base route
    app.get("/", (_req, res) => {
        res.send("Hello from Express");
    });

    // API routes
    app.use("/api", apiRoutes);

    // 404 + error handler
    app.use(notFound);
    app.use(errorHandler);

    return app;
}

module.exports = createApp;

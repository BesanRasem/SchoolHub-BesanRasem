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

    app.use(helmet());

    app.use(
        rateLimit({
            windowMs: 60 * 1000,
            limit: 120,
            standardHeaders: true,
            legacyHeaders: false,
        })
    );

    app.use(cors({ origin: true }));

    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded({ extended: true }));

    app.use(morgan("dev"));

    app.get("/", (_req, res) => {
        res.send("Hello from Express");
    });

    app.use("/api", apiRoutes);

    app.use(notFound);
    app.use(errorHandler);

    return app;
}

module.exports = createApp;

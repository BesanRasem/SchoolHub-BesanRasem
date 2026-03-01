const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const apiRoutes = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload"); 
const path = require("path");

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
app.use(cors({
  origin: "http://localhost:5173", // رابط React app
  credentials: true,                // يسمح بالـ cookies / Authorization headers
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));
    // Body parsers
    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser()); 
    const fs = require("fs");
const tempDir = "C:/tmp/";

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}
    app.use(
  fileUpload({
      useTempFiles: true,
     tempFileDir: "C:/tmp/",
  })
);

    // Logger examples
    app.use(morgan("dev")); // professional logger
    app.use("/uploads", express.static(path.join(__dirname, "uploads")));


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

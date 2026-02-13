function errorHandler(err, _req, res, _next) {
    const status = err.statusCode || 500;

    if (err.name === "CastError") {
        return res.status(400).json({
            ok: false,
            message: "Invalid id format",
            error: err.message,
        });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({
            ok: false,
            message: "Validation error",
            error: err.message,
        });
    }

    res.status(status).json({
        ok: false,
        message: err.message || "Server error",
        details: err.details || null,
        ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
    });
}

module.exports = errorHandler;

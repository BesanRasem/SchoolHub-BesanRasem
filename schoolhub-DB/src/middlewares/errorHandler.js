function errorHandler(err, _req, res, _next) {
    const status = err.statusCode || 500;



    res.status(status).json({
        ok: false,
        message: err.message || "Server error",
        details: err.details || null,
        ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
    });
}

module.exports = errorHandler;

const ApiError = require("../utils/ApiError");

function notFound(req, _res, next) {
    next(new ApiError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

module.exports = notFound;

const ApiError = require("../utils/ApiError");

function auth(req, _res, next) {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";

    const expected = process.env.AUTH_TOKEN;

    if (!token) return next(new ApiError("Unauthorized: missing token", 401));
    if (!expected) return next(new ApiError("Server misconfigured: AUTH_TOKEN missing", 500));
    if (token !== expected) return next(new ApiError("Unauthorized: invalid token", 401));

    req.user = { id: "7779880", name: "Admin", role: "Admin" };
    next();
}

module.exports = auth;

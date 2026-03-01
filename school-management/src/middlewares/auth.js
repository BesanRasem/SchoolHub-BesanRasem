const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError("Authorization token missing", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, role: decoded.role }; 
        next();
    } catch (err) {
        next(new ApiError("Invalid or expired token", 401));
    }
}

function schoolAdmin(req, res, next) {
    if (!req.user || req.user.role !== "schooladmin") {
        return next(new ApiError("Access denied: School Admin only", 403));
    }
    next();
}

module.exports = { auth, schoolAdmin };

const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");


function auth(req, _res, next) {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";


    if (!token) return next(new ApiError("Unauthorized: missing token", 401));
    
     try {
        const decoded = jwt.verify(token, process.env.AUTH_TOKEN);

        req.user = decoded; 
        next(); 
    } catch (err) {
        return next(new ApiError("Unauthorized: invalid token", 401));
    }


}

module.exports = auth;

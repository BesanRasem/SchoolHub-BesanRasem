const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

function validate(req, _res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError("Invalid request data", 400, errors.array()));
    }
    next();
}

module.exports = validate;

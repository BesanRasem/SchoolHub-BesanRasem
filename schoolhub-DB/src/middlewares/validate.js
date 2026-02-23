const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

function validate(req, _res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(  new ApiError(errors.array()[0].msg, 400));
    }
    next();
}

module.exports = validate;

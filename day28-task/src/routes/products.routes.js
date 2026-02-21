const express = require("express");
const { body, param, query } = require("express-validator");
const validate = require("../middlewares/validate");
const products = require("../controller/products.controller");

const router = express.Router();


router.get(
    "/",
    [
        query("page").optional().isInt({ min: 1 }).toInt(),
        query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
        query("q").optional().isString().trim(),
        query("inStock").optional().isBoolean().toBoolean(),
    ],
    validate,
    products.list
);

router.get(
    "/:id",
    [param("id").isMongoId().withMessage("Invalid product id")],
    validate,
    products.getById
);

router.post(
    "/",
    [
        body("name").isString().trim().isLength({ min: 2, max: 120 }),
        body("price").isFloat({ min: 0 }).toFloat(),
        body("currency").optional().isString().trim().isLength({ max: 10 }),
        body("inStock").optional().isBoolean().toBoolean(),
        body("tags").optional().isArray(),
        body("tags.*").optional().isString().trim(),
        body("meta").optional().isObject(),
    ],
    validate,
    products.create
);

router.patch(
    "/:id",
    [
        param("id").isMongoId(),
        body("name").optional().isString().trim().isLength({ min: 2, max: 120 }),
        body("price").optional().isFloat({ min: 0 }).toFloat(),
        body("currency").optional().isString().trim().isLength({ max: 10 }),
        body("inStock").optional().isBoolean().toBoolean(),
        body("tags").optional().isArray(),
        body("tags.*").optional().isString().trim(),
        body("meta").optional().isObject(),
    ],
    validate,
    products.update
);

router.delete(
    "/:id",
    [param("id").isMongoId()],
    validate,
    products.remove
);

module.exports = router;

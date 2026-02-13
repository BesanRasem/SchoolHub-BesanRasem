const express = require("express");
const { body, param, query } = require("express-validator");
const validate = require("../middlewares/validate");
const Students = require("../controllers/students.controller");

const router = express.Router();


router.get(
    "/",
    [
        query("page").optional().isInt({ min: 1 }).toInt(),
        query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
        query("q").optional().isString().trim(),
    ],
    validate,
    Students.list
);

router.get(
    "/:id",
    [param("id").isMongoId().withMessage("Invalid student id")],
    validate,
    Students.getById
);

router.post(
    "/",
    [
        body("fullName").isString().trim().isLength({ min: 2, max: 120 }),
        body("nationalId").isString().trim().isLength({ min: 10, max: 10 }),
        body("parentId").isString().trim().isLength({ min: 10, max: 10 }),
        body("grade").isString().trim(),
        body("section").isString().trim(),
        body("email").isEmail().normalizeEmail(),
        body("password").isString().trim().isLength({ min: 6 }),
    ],
    validate,
    Students.create
);


router.patch(
    "/:id",
    [
        param("id").isMongoId(),
        body("fullName").optional().isString().trim().isLength({ min: 2, max: 120 }),
        body("nationalId").optional().isString().trim().isLength({ min: 10, max: 10 }),
        body("parentId").optional().isString().trim().isLength({ min: 10, max: 10 }),
        body("grade").optional().isString().trim(),
        body("section").optional().isString().trim(),
        body("email").optional().isEmail().normalizeEmail(),
        body("password").optional().isString().trim().isLength({ min: 6 }),
    ],
    validate,
    Students.update
);
router.delete(
    "/:id",
    [param("id").isMongoId()],
    validate,
    Students.remove
);

module.exports = router;

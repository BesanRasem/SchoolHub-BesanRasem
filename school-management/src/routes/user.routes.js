const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const userController = require("../controllers/user.controller");
const validate = require("../middlewares/validate");
const { auth, schoolAdmin} = require("../middlewares/auth");

router.post(
    "/create",
    auth,              
    schoolAdmin,       
    body("name").notEmpty().withMessage("Name is required"),
    body("role").isIn(["student","teacher","parent"]).withMessage("Invalid role"),
    validate,
    userController.createUser
);

router.post(
    "/activate",
    body("code").notEmpty().withMessage("Activation code is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
    validate,
    userController.activateUser
);

router.post(
    "/login",
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    validate,
    userController.login
);

router.post(
    "/forgot-password",
    body("email").isEmail().withMessage("Valid email is required"),
    body("newPassword").isLength({ min: 6 }).withMessage("Password min 6 chars"),
    validate,
    userController.forgotPassword
);

router.get(
    "/",
    auth,
    schoolAdmin,
    userController.listUsers
);

module.exports = router;

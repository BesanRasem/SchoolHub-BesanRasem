const express= require("express");
const{body,param,query}= require("exprss-validator");
const validate = require("../middlewares/validate");
const users = require("../controllers/users.controller");
const router = express.Router();
router.get(
    "/",
    [query("search").optional().isString().trim()],
    validate,
    users.listUsers
);
router.get(
    "/:id",
    [param("id").isString().trim().notEmpty()],
    validate,
    users.getUser
);
router.post(
    "/",
   [ body("name").isString().trim().isLength(),
    body("email").isEmail().normalizeEmail()],
    validate,
    users.createUser
)
router.patch(
    "/:id",
    [
        param("id").isString().trim().notEmpty(),
        body("name").optional().isString().trim().isLength(),
        body("Email").optional().isEmail().normalizeEmail(),
    ],
    validate,
    users.updateUser

);
router.delete(
    "/:id",
    [param("id").isString().trim().notEmpty()],
    validate,
    users.deleteUser
)

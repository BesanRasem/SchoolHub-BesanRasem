const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const validate = require("../middlewares/validate");
const { auth, schoolAdmin,superAdmin} = require("../middlewares/auth");

router.post(
  "/create",
  auth,
  schoolAdmin,

  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("role")
    .isIn(["student","teacher","parent"])
    .withMessage("Role must be student, teacher, or parent"),


  body("classId")
  .optional()
  .isMongoId()
  .withMessage("Invalid classId"),

 body("parentNationalId")
  .if(body("role").equals("student"))
  .optional() // بدل notEmpty
  .isString()
  .withMessage("Invalid parentNationalId"),

  body("parentNationalId")
    .if(body("role").equals("student"))
    .notEmpty()
    .withMessage("parentNationalId is required for students"),

  body("parentPhone")
    .if(body("role").equals("student"))
    .notEmpty()
    .withMessage("parentPhone is required for students")
    .isMobilePhone()
    .withMessage("Invalid parentPhone"),

 

  body("birthDate")
    .optional()
    .isISO8601()
    .toDate(),

  validate,
  userController.createUser
);


router.post(
    "/activate",
    body("userId").notEmpty().withMessage("userId is required"),
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
router.post(
    "/create-superadmin",
    body("name").notEmpty().withMessage("Name is required"),
    validate,
    userController.createSuperAdmin
);
router.post(
  "/create-schooladmin",
  auth, 
  superAdmin,
  body("name").notEmpty().withMessage("Name is required"),
  body("schoolId").notEmpty().withMessage("schoolId is required"),
  body("role").equals("schooladmin").withMessage("Role must be schooladmin"),
  validate,
  userController.createSchoolAdmin
);
router.post(
  "/logout",
  auth,
  userController.logout

)

router.get(
  "/api/auth/refresh",
  userController.refresh
)


module.exports = router;

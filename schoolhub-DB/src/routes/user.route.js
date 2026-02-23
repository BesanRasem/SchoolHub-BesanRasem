const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const validate = require("../middlewares/validate");
const { auth, schoolAdmin,allowRoles,superAdmin, teacher} = require("../middlewares/auth");


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
  .withMessage("select class"),

 body("parentNationalId")
  .if(body("role").equals("student"))
  .optional() 
  .isString()
  .withMessage("Invalid parentNationalId"),

  
  body("parentPhone")
    .if(body("role").equals("student"))
    .notEmpty()
    .withMessage("parentPhone is required for students")
    .isMobilePhone()
    .withMessage("Invalid parentPhone"),

    body("nationalId")
  .optional()
  .matches(/^\d{10}$/)
  .withMessage("National ID must be exactly 10 digits"),

  body("parentNationalId")
  .if(body("role").equals("student"))
  .optional()
  .matches(/^\d{10}$/)
  .withMessage("Parent National ID must be exactly 10 digits"),

  body("parentPhone")
  .if(body("role").equals("student"))
  .matches(/^07\d{8}$/)
  .withMessage("Parent phone must be 10 digits and start with 07"),

 

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
    body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),
    
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
    userController.listStudentsWithParent
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
  "/auth/refresh",
  userController.refresh
)
router.put(
  "/:id",

    body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("role")
    .isIn(["student","teacher","parent"])
    .withMessage("Role must be student, teacher, or parent"),


  body("classId")
  .optional()
  .isMongoId()
  .withMessage("select class"),

 body("parentNationalId")
  .if(body("role").equals("student"))
  .optional() 
  .isString()
  .withMessage("Invalid parentNationalId"),

  
  body("parentPhone")
    .if(body("role").equals("student"))
    .notEmpty()
    .withMessage("parentPhone is required for students")
    .isMobilePhone()
    .withMessage("Invalid parentPhone"),

    body("nationalId")
  .optional()
  .matches(/^\d{10}$/)
  .withMessage("National ID must be exactly 10 digits"),

  body("parentNationalId")
  .if(body("role").equals("student"))
  .optional()
  .matches(/^\d{10}$/)
  .withMessage("Parent National ID must be exactly 10 digits"),

  body("parentPhone")
  .if(body("role").equals("student"))
  .matches(/^07\d{8}$/)
  .withMessage("Parent phone must be 10 digits and start with 07"),

 

  body("birthDate")
    .optional()
    .isISO8601()
  .toDate(),
  validate,
  auth,
  schoolAdmin,
  userController.updateStudent
);

router.delete(
  "/:id",
  auth,
  schoolAdmin,
  userController.deleteStudent
);
router.get(
  "/teachers",
  auth,
  allowRoles("teacher", "schooladmin"),
  userController.listTeachers
);
router.put(
  "/teachers/:id", 
  auth,
  allowRoles("teacher", "schooladmin"),
  userController.updateTeacher);
  router.post("/teachers",
     auth,
     schoolAdmin,
     userController.createTeacher
    );
    router.get(
  "/students/by-class",
  auth,
  userController.getStudentsByClass
);

module.exports = router;

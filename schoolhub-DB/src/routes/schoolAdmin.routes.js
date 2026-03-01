// routes/schoolAdmin.routes.js
const express = require("express");
const { body } = require("express-validator");
const { auth, superAdmin } = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const controller = require("../controllers/schoolAdmin.controller");

const router = express.Router();

router.get("/", auth, superAdmin, controller.listSchoolAdmins);

router.post(
  "/",
  auth,
  superAdmin,
  body("name").notEmpty().withMessage("Name required"),
  body("schoolId").notEmpty().withMessage("schoolId required"),
  validate,
  controller.createSchoolAdmin
);

router.put(
  "/:id",
  auth,
  superAdmin,
  body("name").optional(),
  body("schoolId").optional(),
  validate,
  controller.updateSchoolAdmin
);

router.delete("/:id", auth, superAdmin, controller.deleteSchoolAdmin);

module.exports = router;
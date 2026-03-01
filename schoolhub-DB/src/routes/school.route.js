const express = require("express");
const { body } = require("express-validator");
const { auth, superAdmin } = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const schoolController = require("../controllers/school.controller");

const router = express.Router();

router.post(
  "/create",
  auth,
  superAdmin,
  body("name").notEmpty(),
  validate,
  schoolController.createSchool
);
router.get(
  "/",
  auth,
  superAdmin,
  schoolController.getSchools
);
router.put(
  "/:id",
  auth,
  superAdmin,
  schoolController.updateSchool
);

router.delete(
  "/:id",
  auth,
  superAdmin,
  schoolController.deleteSchool
);
module.exports = router;

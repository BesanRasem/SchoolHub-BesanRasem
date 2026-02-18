const express = require("express");
const { body } = require("express-validator");
const { auth, schoolAdmin } = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const classController = require("../controllers/class.controller");

const router = express.Router();

router.post(
  "/create",
  auth,
  schoolAdmin,
  body("grade").notEmpty(),
  body("section").notEmpty(),
  validate,
  classController.createClass
);

router.get(
  "/",
  auth,
  schoolAdmin,
  classController.listClasses
);

router.delete(
  "/delete/:id",
  auth,
  schoolAdmin,
  classController.deleteClass
);

router.put(
  "/setAdminClass/:id",
  auth,
  schoolAdmin,
  classController.setAdminClass
);

module.exports = router;

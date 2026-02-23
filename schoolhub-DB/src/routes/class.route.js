const express = require("express");
const { body } = require("express-validator");
const { auth, allowRoles,teacher, schoolAdmin } = require("../middlewares/auth");
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
router.get(
  "/my-classes",
  auth,
  teacher, 
  classController.listMyClasses
);

router.delete(
  "/delete/:id",
  auth,
  allowRoles("teacher", "schooladmin"),
  classController.deleteClass
);

router.put(
  "/setAdminClass/:id",
  auth,
  schoolAdmin,
  classController.setAdminClass
);
router.put(
  "/update/:id",
  auth,
  allowRoles("teacher", "schooladmin"),
  classController.updateClass
);


module.exports = router;

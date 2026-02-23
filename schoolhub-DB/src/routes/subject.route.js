const express = require("express");
const { body } = require("express-validator");
const { auth, schoolAdmin ,teacher} = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const subjectController = require("../controllers/subject.controller");

const router = express.Router();

router.get("/", auth, teacher, subjectController.listSubjects);

router.post(
  "/create",
  auth,
  teacher,

  body("name").notEmpty().withMessage("Name is required"),

  body("teacherId")
    .notEmpty()
    .isMongoId()
    .withMessage("Valid teacherId required"),

  body("classId")   
    .notEmpty()
    .isMongoId()
    .withMessage("Valid classId required"),

  validate,
  subjectController.createSubject
);
router.put(
  "/:id",
  auth,
  teacher,
  body("name").optional().isString(),
  body("teacherId").optional().isMongoId(),
  validate,
  subjectController.updateSubject
)
router.get("/", auth, subjectController.getSubjects);
router.delete("/:id", auth, teacher, subjectController.deleteSubject);
router.get("/teach", auth, subjectController.getSubjects);
module.exports = router;
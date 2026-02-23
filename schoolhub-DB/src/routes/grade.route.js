const express = require("express");
const { auth, teacher } = require("../middlewares/auth");
const controller = require("../controllers/garde.controller");

const router = express.Router();

router.get("/", auth,  controller.getGradesBySubject);

router.put(
  "/student/:studentId",
  auth,
  teacher,
  controller.upsertGrade
);

router.delete(
  "/student/:studentId/subject/:subjectId",
  auth,
  teacher,
  controller.deleteGrade
);
router.get("/student", auth, controller.getGradesForStudent);

module.exports = router;
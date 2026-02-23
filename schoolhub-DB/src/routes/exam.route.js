const express = require("express");
const router = express.Router();
const { auth,teacher} = require("../middlewares/auth");

const Exam = require("../controllers/exam.controller");

router.post("/create", auth,teacher, Exam.createExam);
router.get("/", auth,teacher, Exam.listExams);
router.put("/:id",auth, teacher,Exam. updateExam);
router.delete("/:id",auth, teacher, Exam.deleteExam);
router.get("/student", auth, Exam.listExamsForStudent);
module.exports = router;
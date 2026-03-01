const express = require("express");
const router = express.Router();
const controller = require("../controllers/homework.controller");
const { auth } = require("../middlewares/auth");

// ================== المعلم ==================
router.get("/", auth, controller.getHomeworks); // كل الواجبات + فلترة submissionDate

// ================== الطالب ==================
router.get("/student", auth, controller.getHomeworksForStudent); // واجبات الطالب

// ================== إضافة واجب ==================
router.post("/", auth, controller.createHomework);

// ================== تسليم واجب ==================
router.post("/:homeworkId/submit", auth, controller.submitHomework);

module.exports = router;
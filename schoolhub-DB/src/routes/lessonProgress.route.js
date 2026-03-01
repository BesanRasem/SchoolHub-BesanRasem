const express = require("express");
const router = express.Router();
const controller = require("../controllers/lessonProgress.controller");
const { auth} = require("../middlewares/auth");

router.get("/", auth, controller.getStudentLessons);
router.post("/toggle", auth, controller.toggleLessonCompletion);
router.get("/completion-rate", auth, controller.getCompletionRate);

module.exports = router;
const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lesson.controller");
const { auth, teacher } = require("../middlewares/auth");


router.post("/upload", auth, teacher, lessonController.uploadLesson);
router.get("/", auth, lessonController.getLessons);
router.delete("/:id", auth, teacher, lessonController.deleteLesson);

module.exports = router;
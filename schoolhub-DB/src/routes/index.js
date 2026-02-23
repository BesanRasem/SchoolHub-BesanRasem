const express = require("express");
const userRoutes = require("./user.route");
const router = express.Router();
const schoolRoutes =require("./school.route")
const classRoutes =require("./class.route")
const examRoutes= require("./exam.route")
const subjectRoutes = require("./subject.route");
const scheduleRoutes = require("./schedule.routes")
const attendanceRoutes = require("./attendance.route");
const gradeRoutes =require("./grade.route");
const lessonRpoute =require("./lesson.routes");
const subjectInfoRoutes = require("./subjectInfo.route"); 

router.get("/health", (_req, res) => {
    res.json({ ok: true, message: "API is healthy" });
});


router.use("/users", userRoutes);
router.use("/schools",schoolRoutes);
router.use("/classes",classRoutes);
router.use("/subjects", subjectRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/exams",examRoutes);
router.use("/schedule",scheduleRoutes);
router.use("/grades",gradeRoutes);
router.use("/lessons",lessonRpoute);
router.use("/subject-info", subjectInfoRoutes); 

module.exports = router;

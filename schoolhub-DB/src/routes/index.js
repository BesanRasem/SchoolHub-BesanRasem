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
const homeworkRoutes =require("./homework.route");
const lessonProgressRoutes=require("./lessonProgress.route");
const schoolAdminRoutes=require("./schoolAdmin.routes");
const holidayRoutes = require("./holiday.route");


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
router.use("/homework", homeworkRoutes);
router.use("/lesson-progress", lessonProgressRoutes);
router.use("/school-admin",schoolAdminRoutes);
router.use("/holidays", holidayRoutes);

module.exports = router;

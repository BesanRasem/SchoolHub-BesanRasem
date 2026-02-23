const express = require("express");
const router = express.Router();
const { auth, teacher } = require("../middlewares/auth");
const attendanceController = require("../controllers/attendance.controller");

router.get("/:classId", auth, teacher,attendanceController.getAttendance);
router.get("/student/:studentId", auth, attendanceController.getStudentAttendance);
router.post("/:classId", auth, teacher, attendanceController.saveAttendance);

module.exports = router;
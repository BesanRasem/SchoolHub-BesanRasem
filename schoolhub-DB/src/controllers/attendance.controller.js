const Attendance = require("../models/attendance");
const User = require("../models/user");

exports.getAttendance = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const { date } = req.query;

    if (!classId || !date) return res.status(400).json({ message: "classId and date required" });

    const students = await User.find({ classId, role: "student" }).select("name _id").lean();

    let attendance = await Attendance.findOne({ classId, date }).lean();
    if (!attendance) {
      attendance = { students: students.map(s => ({ studentId: s._id, status: "present" })) };
    }

    res.json({ students, attendance });
  } catch (err) {
    next(err);
  }
};
exports.getStudentAttendance = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    if (!studentId) return res.status(400).json({ message: "studentId required" });

    const attendanceRecords = await Attendance.find({ "students.studentId": studentId }).lean();

    let total = 0;
    let present = 0;

    // هنا تعديلنا
    let absentDates = [];

    attendanceRecords.forEach(record => {
      record.students.forEach(s => {
        if (s.studentId.toString() === studentId) {
          total++;
          if (s.status === "present") present++;
          if (s.status === "absent") absentDates.push(record.date); // إضافة الأيام الغياب
        }
      });
    });

    const rate = total === 0 ? 0 : Math.round((present / total) * 100);

    // نرجع الغيابات مع البيانات
    res.json({ totalDays: total, presentDays: present, attendanceRate: rate, absentDates });

  } catch (err) {
    next(err);
  }
};
exports.saveAttendance = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const { date, students } = req.body;

    if (!classId || !date || !students) return res.status(400).json({ message: "Missing data" });

    const updated = await Attendance.findOneAndUpdate(
      { classId, date },
      { students },
      { upsert: true, new: true }
    );

    res.json({ ok: true, attendance: updated });
  } catch (err) {
    next(err);
  }
};
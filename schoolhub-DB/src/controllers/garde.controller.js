const Grade = require("../models/grade");
const Subject = require("../models/subject");

const getGradesBySubject = async (req, res, next) => {
  try {
    const { subjectId, classId } = req.query;

    const subject = await Subject.findOne({
      _id: subjectId,
      teacherId: req.user.id,
      schoolId: req.user.schoolId,
    });

    if (!subject)
      return res.status(403).json({ message: "Access denied" });

    const grades = await Grade.find({ subjectId, classId })
      .populate("studentId", "name")
      .lean();

    res.json({ ok: true, data: grades });
  } catch (err) {
    next(err);
  }
};
const upsertGrade = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { subjectId, classId, test1, test2, test3, final } = req.body;

    const grade = await Grade.findOneAndUpdate(
      { studentId, subjectId },
      {
        studentId,
        subjectId,
        classId,
        teacherId: req.user.id,
        schoolId: req.user.schoolId,
        test1,
        test2,
        test3,
        final,
      },
      { upsert: true, new: true }
    );

    res.json({ ok: true, data: grade });
  } catch (err) {
    next(err);
  }
};
const deleteGrade = async (req, res, next) => {
  try {
    const { studentId, subjectId } = req.params;

    await Grade.findOneAndDelete({ studentId, subjectId });

    res.json({ ok: true, message: "Grade deleted" });
  } catch (err) {
    next(err);
  }
};

const getGradesForStudent = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    const classId = req.user.classId;

    if (!classId) return res.status(400).json({ message: "Student has no class assigned" });

    // جلب المواد للصف
    const subjects = await Subject.find({ classId, schoolId: req.user.schoolId }).lean();

    // جلب الدرجات للطالب
    const grades = await Grade.find({ studentId, classId }).lean();

    // دمج الدرجات مع المواد
    const data = subjects.map(subject => {
      const grade = grades.find(g => g.subjectId.toString() === subject._id.toString());
      return {
        _id: subject._id,
        name: subject.name,
        teacher: subject.teacherId,
        test1: grade?.test1 || null,
        test2: grade?.test2 || null,
        test3: grade?.test3 || null,
        final: grade?.final || null
      };
    });

    res.json({ ok: true, data });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getGradesForStudent,
  deleteGrade,
  upsertGrade,
  getGradesBySubject

};
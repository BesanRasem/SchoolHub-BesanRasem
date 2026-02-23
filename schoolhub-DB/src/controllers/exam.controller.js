const Exam = require("../models/exam");
const Subject = require("../models/subject");

async function createExam(req, res, next) {
  try {
    const { name, subjectId, classId, examType, examDate, examTime } = req.body;

    if (!name || !subjectId || !classId || !examType || !examDate || !examTime) {
      return res.status(400).json({ ok: false, message: "All fields required" });
    }

    const subject = await Subject.findOne({
      _id: subjectId,
      classId,
      schoolId: req.user.schoolId,
    });

    if (!subject) {
      return res.status(404).json({ ok: false, message: "Subject not found" });
    }

    const exam = await Exam.create({
      name,
      subjectId,
      classId,
      examType,
      examDate,
      examTime,
      teacherId: req.user.id,
      schoolId: req.user.schoolId,
    });

    res.status(201).json({ ok: true, data: exam });
  } catch (err) {
    next(err);
  }
}

async function listExams(req, res, next) {
  try {
    const { classId } = req.query;

    const query = {
      classId,
      schoolId: req.user.schoolId,
    };

    if (req.user.role === "teacher") {
      query.teacherId = req.user.id;
    }

    const exams = await Exam.find(query)
      .populate("subjectId", "name")
      .sort({ examDate: 1 });

    res.json({ ok: true, data: exams });
  } catch (err) {
    next(err);
  }
}

async function updateExam(req, res, next) {
  try {
    const { id } = req.params;

    const query = { _id: id, schoolId: req.user.schoolId };
    if (req.user.role === "teacher") {
      query.teacherId = req.user.id;
    }

    const exam = await Exam.findOneAndUpdate(query, req.body, { new: true });

    if (!exam) {
      return res.status(404).json({ ok: false, message: "Exam not found or access denied" });
    }

    res.json({ ok: true, data: exam });
  } catch (err) {
    next(err);
  }
}

async function deleteExam(req, res, next) {
  try {
    const { id } = req.params;

    const query = { _id: id, schoolId: req.user.schoolId };
    if (req.user.role === "teacher") {
      query.teacherId = req.user.id;
    }

    const exam = await Exam.findOneAndDelete(query);

    if (!exam) {
      return res.status(404).json({ ok: false, message: "Exam not found or access denied" });
    }

    res.json({ ok: true, message: "Exam deleted successfully" });
  } catch (err) {
    next(err);
  }
}
async function listExamsForStudent(req, res, next) {
  try {
    const { classId } = req.query;

    if (!classId) return res.status(400).json({ ok: false, message: "classId required" });

    const exams = await Exam.find({ classId, schoolId: req.user.schoolId })
      .populate("subjectId", "name")
      .sort({ examDate: 1 });

    res.json({ ok: true, data: exams });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createExam,
  listExams,
  updateExam,
  deleteExam,
  listExamsForStudent
};
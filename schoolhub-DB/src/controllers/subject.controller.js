const Subject = require("../models/subject");
const User = require("../models/user");
async function listSubjects(req, res, next) {
  try {
    const { classId } = req.query;

    let query = { schoolId: req.user.schoolId };

    if (classId) {
      query.classId = classId;
    }


    const subjects = await Subject.find(query)
      .populate("teacherId", "name email");

    res.json({ ok: true, data: subjects });
  } catch (err) {
    next(err);
  }
}
async function createSubject(req, res, next) {
  try {
    const { name, teacherId, classId } = req.body; 

    const newSubject = await Subject.create({
      name,
      teacherId,
      classId, 
      schoolId: req.user.schoolId,
    });

    res.status(201).json({ ok: true, data: newSubject });
  } catch (err) {
    next(err);
  }
}
async function updateSubject(req, res, next) {
  try {
    const { id } = req.params;
    const { name, teacherId } = req.body;

    const subject = await Subject.findOne({ _id: id, schoolId: req.user.schoolId });
    if (!subject) return res.status(404).json({ ok: false, message: "Subject not found" });

    if (teacherId) {
      const teacher = await User.findOne({ _id: teacherId, role: "teacher", schoolId: req.user.schoolId });
      if (!teacher) return res.status(404).json({ ok: false, message: "Teacher not found" });
      subject.teacherId = teacherId;
    }

    if (name) subject.name = name;

    await subject.save();
    res.json({ ok: true, data: subject });
  } catch (err) {
    next(err);
  }
}

async function deleteSubject(req, res, next) {
  try {
    const { id } = req.params;
    const subject = await Subject.findOneAndDelete({ _id: id, schoolId: req.user.schoolId });
    if (!subject) return res.status(404).json({ ok: false, message: "Subject not found" });

    res.json({ ok: true, message: "Subject deleted" });
  } catch (err) {
    next(err);
  }
}
const getSubjects = async (req, res, next) => {
  try {
    const { classId } = req.query;

    if (!classId) {
      return res.status(400).json({ message: "classId required" });
    }

    const filter = {
      schoolId: req.user.schoolId,
      classId,
    };

    if (req.user.role === "teacher") {
      filter.teacherId = req.user.id;
    }

    const subjects = await Subject.find(filter).lean();

    res.json({ ok: true, data: subjects });
  } catch (err) {
    next(err);
  }
};

module.exports = { listSubjects, createSubject, updateSubject, deleteSubject ,getSubjects};
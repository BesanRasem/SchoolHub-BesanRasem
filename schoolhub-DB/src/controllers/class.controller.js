const Class = require("../models/class");
const Subject = require("../models/subject");
const User = require("../models/user");

async function createClass(req, res, next) {
  try {
    const { grade, section, AdminClass } = req.body;
    const newClass = await Class.create({
      grade,
      section,
      schoolId: req.user.schoolId,
      AdminClass: AdminClass || null,
    });
    res.status(201).json({ ok: true, data: newClass });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ ok: false, message: "Class already exists" });
    }
    next(err);
  }
}

async function listClasses(req, res, next) {
  try {
    const classes = await Class.find({ schoolId: req.user.schoolId })
      .populate("AdminClass", "name email");
    res.json({
      ok: true,
      total: classes.length,
      data: classes,
    });
  } catch (err) {
    next(err);
  }
}

async function listMyClasses(req, res, next) {
  try {
    const teacherId = req.user.id;
    const schoolId = req.user.schoolId;

    const homeroomClasses = await Class.find({ schoolId: schoolId, AdminClass: teacherId }).lean();
    const subjectEntries = await Subject.find({ schoolId: schoolId, teacherId: teacherId }).distinct("classId");
    const subjectClasses = await Class.find({ _id: { $in: subjectEntries }, AdminClass: { $ne: teacherId } }).lean();

    const allMyClasses = [
      ...homeroomClasses.map(c => ({ ...c, type: "homeroom" })),
      ...subjectClasses.map(c => ({ ...c, type: "subject" }))
    ];

    res.json({ ok: true, data: allMyClasses });
  } catch (err) {
    next(err);
  }
}

async function deleteClass(req, res, next) {
  try {
    const classId = req.params.id;
    const classDoc = await Class.findOne({ _id: classId, schoolId: req.user.schoolId });
    if (!classDoc) return res.status(404).json({ message: "Class not found" });

    await Class.deleteOne({ _id: classId });
    await User.updateMany({ classId }, { $unset: { classId: "" } });

    res.json({ ok: true, message: "Class deleted successfully" });
  } catch (err) {
    next(err);
  }
}

async function setAdminClass(req, res, next) {
  try {
    const { teacherId } = req.body;
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      { AdminClass: teacherId || null },
      { new: true }
    ).populate("AdminClass", "name email");

    res.json({ ok: true, data: updatedClass });
  } catch (err) {
    next(err);
  }
}

async function updateClass(req, res, next) {
  try {
    const classId = req.params.id;
    const { grade, section, teacherId } = req.body;

    const classDoc = await Class.findOne({ _id: classId, schoolId: req.user.schoolId });
    if (!classDoc) return res.status(404).json({ ok: false, message: "Class not found" });

    if (grade !== undefined) classDoc.grade = grade;
    if (section !== undefined) classDoc.section = section;
    if (teacherId !== undefined) classDoc.AdminClass = teacherId || null;

    await classDoc.save();

    const populated = await Class.findById(classId).populate("AdminClass", "name email");

    res.json({ ok: true, message: "Class updated successfully", data: populated });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createClass,
  listClasses,
  listMyClasses,
  deleteClass,
  setAdminClass,
  updateClass
};
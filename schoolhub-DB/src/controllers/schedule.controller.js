const Schedule = require("../models/schedule");
const Class = require("../models/class");
const Subject = require("../models/subject");

async function isClassAdmin(userId, classId) {
  const cls = await Class.findById(classId);
  return cls && cls.AdminClass?.toString() === userId.toString();
}

async function listSchedule(req, res, next) {
  try {
    const { classId } = req.query;
    if (!classId) return res.status(400).json({ ok: false, message: "classId is required" });

    const schedule = await Schedule.find({ classId, schoolId: req.user.schoolId })
      .populate("subjectId", "name")
      .sort({ day: 1, startTime: 1 });

    res.json({ ok: true, data: schedule });
  } catch (err) {
    next(err);
  }
}

async function createSchedule(req, res, next) {
  try {
    const { classId, subjectId, day, startTime, endTime } = req.body;
    if (!classId || !subjectId || !day || !startTime || !endTime) {
      return res.status(400).json({ ok: false, message: "All fields are required" });
    }

    const admin = await isClassAdmin(req.user.id, classId);
    if (!admin) return res.status(403).json({ ok: false, message: "Only class admin can add slots" });

    const subject = await Subject.findOne({ _id: subjectId, classId, schoolId: req.user.schoolId });
    if (!subject) return res.status(404).json({ ok: false, message: "Subject not found" });

    const slot = await Schedule.create({ schoolId: req.user.schoolId, classId, subjectId, day, startTime, endTime });
    res.status(201).json({ ok: true, data: slot });
  } catch (err) {
    next(err);
  }
}

async function updateSchedule(req, res, next) {
  try {
    const { id } = req.params;
    const slot = await Schedule.findById(id);
    if (!slot) return res.status(404).json({ ok: false, message: "Schedule not found" });

    const admin = await isClassAdmin(req.user.id, slot.classId);
    if (!admin) return res.status(403).json({ ok: false, message: "Only class admin can edit slots" });

    const { subjectId, day, startTime, endTime } = req.body;
    if (subjectId) slot.subjectId = subjectId;
    if (day) slot.day = day;
    if (startTime) slot.startTime = startTime;
    if (endTime) slot.endTime = endTime;

    await slot.save();
    res.json({ ok: true, data: slot });
  } catch (err) {
    next(err);
  }
}

async function deleteSchedule(req, res, next) {
  try {
    const { id } = req.params;
    const slot = await Schedule.findById(id);
    if (!slot) return res.status(404).json({ ok: false, message: "Schedule not found" });

    const admin = await isClassAdmin(req.user.id, slot.classId);
    if (!admin) return res.status(403).json({ ok: false, message: "Only class admin can delete slots" });

    await slot.deleteOne();
    res.json({ ok: true, message: "Slot deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { listSchedule, createSchedule, updateSchedule, deleteSchedule };
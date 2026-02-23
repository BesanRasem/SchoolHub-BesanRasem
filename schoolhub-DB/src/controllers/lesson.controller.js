const Lesson = require("../models/lesson");
const Subject = require("../models/subject");
const VimeoClient = require("../config/vimeo/client");

exports.uploadLesson = async (req, res, next) => {
  try {
    const { title, subjectId, classId } = req.body;

    if (!req.files || !req.files.video) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    // 1️⃣ تأكد إن المادة موجودة
    const subject = await Subject.findOne({
      _id: subjectId,
      teacherId: req.user.id,        // 👈 أهم سطر
      classId,
      schoolId: req.user.schoolId,
    });

    if (!subject) {
      return res.status(403).json({
        message: "You are not allowed to upload to this subject",
      });
    }

    const videoFile = req.files.video;

    VimeoClient.upload(
      videoFile.data,
      { name: title, description: "Lesson video" },

      async (uri) => {
        const videoId = uri.split("/").pop();
        const videoUrl = `https://player.vimeo.com/video/${videoId}`;

        const lesson = await Lesson.create({
          title,
          videoUrl,
          subjectId,
          classId,
          teacherId: req.user.id,
          schoolId: req.user.schoolId,
        });

        res.json({ ok: true, data: lesson });
      },

      null,

      (error) => {
        console.error(error);
        res.status(500).json({ message: "Vimeo upload failed" });
      }
    );
  } catch (err) {
    next(err);
  }
};


exports.getLessons = async (req, res, next) => {
  try {
    const { subjectId } = req.query;

    if (!subjectId) {
      return res.status(400).json({ message: "subjectId required" });
    }

    const lessons = await Lesson.find({
      subjectId,
      teacherId: req.user.id,
      schoolId: req.user.schoolId,
    });

    res.json({ ok: true, data: lessons });
  } catch (err) {
    next(err);
  }
};


exports.deleteLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    await lesson.deleteOne();

    res.json({ ok: true, message: "Lesson deleted" });
  } catch (err) {
    next(err);
  }
};
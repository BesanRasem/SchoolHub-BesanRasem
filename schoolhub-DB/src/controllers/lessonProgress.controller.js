const LessonProgress = require("../models/lessonProgress");
const Lesson = require("../models/lesson");

// 1️⃣ إرجاع دروس الطالب
exports.getStudentLessons = async (req, res) => {
  try {
    const { subjectId } = req.query;

    if (!subjectId) {
      return res.status(400).json({ message: "subjectId is required" });
    }

    // 🔹 هان الفلترة الصح
    const lessons = await Lesson.find({
      schoolId: req.user.schoolId,
      subjectId: subjectId,
    });

    const progress = await LessonProgress.find({
      studentId: req.user.id,
      lessonId: { $in: lessons.map(l => l._id) },
    });

    const completedMap = {};
    progress.forEach((p) => {
      completedMap[p.lessonId.toString()] = p.completed;
    });

    const result = lessons.map((lesson) => ({
      ...lesson._doc,
      completed: completedMap[lesson._id.toString()] || false,
    }));

    res.json({ ok: true, data: result });
  } catch (err) {
    console.error("GET STUDENT LESSONS ERROR:", err);
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 2️⃣ تبديل حالة الإكمال
exports.toggleLessonCompletion = async (req, res) => {
  try {
    const { lessonId } = req.body;

    let progress = await LessonProgress.findOne({
      studentId: req.user.id,
      lessonId,
    });

    if (!progress) {
      progress = await LessonProgress.create({
        studentId: req.user.id,
        lessonId,
        completed: true,
      });
    } else {
      progress.completed = !progress.completed;
      await progress.save();
    }

    res.json({ ok: true, data: progress });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 3️⃣ نسبة الإنجاز
exports.getCompletionRate = async (req, res) => {
  try {
    const totalLessons = await Lesson.countDocuments({
      schoolId: req.user.schoolId,
    });

    const completedLessons = await LessonProgress.countDocuments({
      studentId: req.user.id,
      completed: true,
    });

    const rate =
      totalLessons === 0
        ? 0
        : Math.round((completedLessons / totalLessons) * 100);

    res.json({ ok: true, rate });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};
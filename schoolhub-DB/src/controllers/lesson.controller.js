const Lesson = require("../models/lesson");
const Subject = require("../models/subject");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// 1. جلب الدروس (معدّل ليعمل للطالب والمدرس)
exports.getLessons = async (req, res) => {
  try {
    const { subjectId } = req.query;

    if (!subjectId) {
      return res.status(400).json({ message: "subjectId is required" });
    }

    // الاستعلام الأساسي: جلب الدروس التابعة للمادة والمدرسة
    let query = { 
      subjectId, 
      schoolId: req.user.schoolId 
    };

    // تحسين: إذا كان المستخدم مدرس، يرى فقط الدروس التي رفعها هو بنفسه (اختياري)
    // إذا كنتِ تريدين أن يرى المدرسون دروس بعضهم، اتركي الاستعلام كما هو
    if (req.user.role === "teacher") {
       // query.teacherId = req.user.id; 
    }

    const lessons = await Lesson.find(query).sort({ createdAt: -1 }); // ترتيب من الأحدث للأقدم

    res.json({ ok: true, data: lessons });
  } catch (err) {
    console.error("GET LESSONS ERROR:", err);
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 2. رفع درس جديد (للمدرسين فقط)
exports.uploadLesson = async (req, res) => {
  try {
    const { title, subjectId, classId } = req.body;

    if (!title || !subjectId || !classId) {
      return res.status(400).json({ message: "Missing required data (title, subjectId, or classId)" });
    }

    if (!req.files || !req.files.video) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    // التحقق من صلاحية المدرس لهذه المادة
    const subject = await Subject.findOne({
      _id: subjectId,
      teacherId: req.user.id,
      schoolId: req.user.schoolId,
    });

    if (!subject) {
      return res.status(403).json({ message: "Not authorized to upload to this subject" });
    }

    const video = req.files.video;

    // الرفع على Cloudinary
    const result = await cloudinary.uploader.upload(video.tempFilePath, {
      resource_type: "video",
      folder: `schoolhub/${req.user.schoolId}/lessons`,
      upload_preset: "blog_uploads", // تأكدي أن هذا الـ preset موجود في إعدادات Cloudinary
    });

    // حذف الملف المؤقت من السيرفر بعد الرفع
    if (fs.existsSync(video.tempFilePath)) {
        fs.unlinkSync(video.tempFilePath);
    }

    const lesson = await Lesson.create({
      title,
      videoUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
      subjectId,
      classId,
      teacherId: req.user.id,
      schoolId: req.user.schoolId,
    });

    res.json({ ok: true, data: lesson });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ ok: false, message: "Upload failed", error: err.message });
  }
};

// 3. حذف درس
exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findOne({
      _id: req.params.id,
      teacherId: req.user.id, // فقط المدرس الذي رفع الفيديو يمكنه حذفه
      schoolId: req.user.schoolId,
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found or unauthorized" });
    }

    // حذف الفيديو من Cloudinary
    if (lesson.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(lesson.cloudinaryPublicId, {
        resource_type: "video",
      });
    }

    await lesson.deleteOne();

    res.json({ ok: true, message: "Lesson deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ ok: false, message: err.message });
  }
};
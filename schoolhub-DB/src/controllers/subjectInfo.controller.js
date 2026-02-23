const SubjectInfo = require("../models/subjectInfo");
const path = require("path");
const fs = require("fs");

// حفظ أو تعديل معلومات المادة
exports.saveSubjectInfo = async (req, res, next) => {
  try {
    const { subjectId, description } = req.body;

    if (!subjectId) return res.status(400).json({ message: "subjectId is required" });

    let imageUrl;
    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const uploadPath = path.join(__dirname, "../uploads/subjects", imageFile.name);

      // إنشاء مجلد لو ما موجود
      if (!fs.existsSync(path.dirname(uploadPath))) fs.mkdirSync(path.dirname(uploadPath), { recursive: true });

      await imageFile.mv(uploadPath);
      imageUrl = `/uploads/subjects/${imageFile.name}`; // مسار للوصول من الفرونت
    }

    // تحقق إذا موجود مسبقاً
    let info = await SubjectInfo.findOne({ subjectId });

    if (info) {
      info.description = description || info.description;
      if (imageUrl) info.imageUrl = imageUrl;
      info.updatedAt = Date.now();
      await info.save();
    } else {
      info = await SubjectInfo.create({
        subjectId,
        description,
        imageUrl,
        teacherId: req.user.id,
      });
    }

    res.json({ ok: true, data: info });
  } catch (err) {
    next(err);
  }
};

// جلب info لمادة معينة
exports.getSubjectInfo = async (req, res, next) => {
  try {
    const { subjectId } = req.query;
    if (!subjectId) return res.status(400).json({ message: "subjectId is required" });

    const info = await SubjectInfo.findOne({ subjectId });
    res.json({ ok: true, data: info });
  } catch (err) {
    next(err);
  }
};
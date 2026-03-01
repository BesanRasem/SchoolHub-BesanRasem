const SubjectInfo = require("../models/subjectInfo");
const cloudinary = require("../config/cloudinary");
const Subject = require("../models/subject"); 

exports.saveSubjectInfo = async (req, res, next) => {
  try {
    const { subjectId, description } = req.body;
    if (!subjectId) return res.status(400).json({ message: "subjectId is required" });

    let imageUrl;

    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {
        folder: `schoolhub/${req.user.schoolId}/subjects`,
        public_id: `subject-${Date.now()}`,
        overwrite: true,
      });
      imageUrl = result.secure_url;
    }

    // جلب info الحالي
    let info = await SubjectInfo.findOne({ subjectId });

    if (info) {
      // تحديث الحقول إذا فيه قيم جديدة
      info.description = description || info.description;
      if (imageUrl) info.imageUrl = imageUrl;
      info.updatedAt = Date.now();
      await info.save();
    } else {
      // إنشاء جديد لو ما موجود
      info = await SubjectInfo.create({
        subjectId,
        description,
        imageUrl,
        teacherId: req.user.id,
      });
    }

    res.json({ ok: true, message: "Subject info updated successfully!", data: info });

  } catch (err) {
    next(err);
  }
};

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
exports.getSubjectsForStudent = async (req, res, next) => {
  try {
    const { classId } = req.query;
    if (!classId) return res.status(400).json({ message: "classId required" });

    const subjects = await Subject.find({ 
      classId, 
      schoolId: req.user.schoolId 
    }).lean();

    const subjectsWithInfo = await Promise.all(
      subjects.map(async (sub) => {
        const info = await SubjectInfo.findOne({ subjectId: sub._id }).lean();
        return {
          ...sub,
          description: info?.description || "",
          imageUrl: info?.imageUrl || "",
        };
      })
    );

    res.json({ ok: true, data: subjectsWithInfo });
  } catch (err) {
    next(err); 
  }
};
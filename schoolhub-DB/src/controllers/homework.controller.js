const mongoose = require("mongoose");
const Homework = require("../models/Homework");



exports.getHomeworks = async (req, res) => {
  try {
    const { classId, submissionDate } = req.query;

    if (!classId || !mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ success: false, message: "Invalid Class ID" });
    }

    let query = { classId, teacherId: req.user.id }; // ← يضمن فقط واجبات المعلم الحالي

    if (submissionDate && submissionDate !== "all") {
      const start = new Date(submissionDate);
      start.setHours(0, 0, 0, 0);
      
      const end = new Date(submissionDate);
      end.setHours(23, 59, 59, 999);

      query.dueDate = { $gte: start, $lte: end };
    }

    const homeworks = await Homework.find(query)
      .populate("submissions.studentId", "name email")
      .lean();

    res.json({ success: true, data: homeworks });

  } catch (err) {
    console.error("Error in getHomeworks:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ================== للمعلم: إضافة واجب جديد ==================
exports.createHomework = async (req, res) => {
  try {
    const { subject, description, pdfUrl, dueDate, classId } = req.body;

    if (!subject || !dueDate || !classId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const homework = await Homework.create({
      teacherId: req.user.id, 
      subject,
      description,
      pdfUrl,
      dueDate,
      classId
    });

    res.status(201).json({ success: true, data: homework });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================== للطالب: تسليم الواجب ==================
exports.submitHomework = async (req, res) => {
  try {
    const { homeworkId } = req.params;
    const { pdfUrl } = req.body;
    const studentId = req.user.id;

    if (!pdfUrl) return res.status(400).json({ message: "PDF URL is required" });

    const homework = await Homework.findById(homeworkId);
    if (!homework) return res.status(404).json({ message: "Homework not found" });

    const alreadySubmitted = homework.submissions.find(
      s => s.studentId?.toString() === studentId
    );
    if (alreadySubmitted) return res.status(400).json({ message: "Already submitted" });

    homework.submissions.push({
      studentId,
      pdfUrl,
      submittedAt: new Date() // يسجل الوقت الحالي بدقة
    });

    await homework.save();
    res.json({ success: true, message: "Submitted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================== للطالب: جلب واجباته الخاصة ==================
exports.getHomeworksForStudent = async (req, res) => {
  try {
    const { classId } = req.query;
    const studentId = req.user.id;

    if (!classId) return res.status(400).json({ message: "classId required" });

    const homeworks = await Homework.find({ classId }).lean();

    const data = homeworks.map(hw => {
      const submission = hw.submissions.find(
        s => s.studentId?.toString() === studentId
      );

      let status = "Pending";
      if (submission) status = "Submitted";
      else if (new Date() > new Date(hw.dueDate)) status = "Late";

      return {
        ...hw,
        status,
        submittedAt: submission?.submittedAt || null
      };
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
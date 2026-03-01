const mongoose = require("mongoose");

const LessonProgressSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// منع التكرار (نفس الطالب ما يعمل نفس الدرس مرتين)
LessonProgressSchema.index(
  { studentId: 1, lessonId: 1 },
  { unique: true }
);

module.exports = mongoose.model("LessonProgress", LessonProgressSchema);
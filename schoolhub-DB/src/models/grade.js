const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },

    test1: { type: Number, min: 0, max: 100, default: null },
    test2: { type: Number, min: 0, max: 100, default: null },
    test3: { type: Number, min: 0, max: 100, default: null },
    final: { type: Number, min: 0, max: 100, default: null },
  },
  { timestamps: true }
);

/**
 * طالب واحد + مادة وحدة = سجل علامات واحد
 */
gradeSchema.index(
  { studentId: 1, subjectId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Grade", gradeSchema);
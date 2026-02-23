const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // المستخدمين اللي دورهم teacher
      required: true,
    },
    classId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Class",
  required: true
}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
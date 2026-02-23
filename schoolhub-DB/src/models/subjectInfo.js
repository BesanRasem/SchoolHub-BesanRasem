const mongoose = require("mongoose");

const subjectInfoSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true, unique: true },
  description: { type: String },
  imageUrl: { type: String }, // بعد رفع الصورة ممكن تخزن URL
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SubjectInfo", subjectInfoSchema);
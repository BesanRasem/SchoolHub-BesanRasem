const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema(
  {
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    subject: { type: String, required: true },
    description: { type: String },
    pdfUrl: { type: String },
    dueDate: { type: Date, required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    submissions: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        pdfUrl: String,
        submittedAt: Date
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Homework", homeworkSchema);
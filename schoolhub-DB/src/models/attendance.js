const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  date: { type: String, required: true },
  students: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      status: { type: String, enum: ["present", "absent"], default: "absent" }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
  studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  teacherIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Class", classSchema);

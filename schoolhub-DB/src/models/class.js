const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    grade: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    AdminClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

classSchema.index({ grade: 1, section: 1, schoolId: 1 }, { unique: true });

module.exports = mongoose.model("Class", classSchema);

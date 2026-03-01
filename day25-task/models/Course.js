import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  }
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
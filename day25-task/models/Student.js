import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  major: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    { name: { type: String, required: true, unique: true, trim: true } },
    { timestamps: true }
);

CategorySchema.index({ name: 1 }, { unique: true });

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);

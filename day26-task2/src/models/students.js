const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true, trim: true },
        nationalId: { type: String, required: true, unique: true },
        parentId: { type: String, required: true },
        grade: { type: String, required: true },
        class: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        meta: { type: Object, default: {} },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);

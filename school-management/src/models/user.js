const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    sparse: true, // يسمح بأن يكون فارغ لبعض المستخدمين قبل التفعيل
  },

  password: { type: String },

  role: {
    type: String,
    enum: ["superadmin","schooladmin","teacher","student","parent"],
    required: true
  },
  nationalId: {
    type: String,
    unique: true,
    sparse: true
  },

  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  childrenIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  studentCode: { type: String, unique: true, sparse: true }, 
  parentCode: { type: String, unique: true, sparse: true }, 
  teacherCode: { type: String, unique: true, sparse: true},

  isActivated: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);

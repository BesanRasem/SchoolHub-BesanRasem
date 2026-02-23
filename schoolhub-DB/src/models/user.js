const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    unique: true,
    sparse: true,
  },

  password: { type: String },

  role: {
    type: String,
    enum: ["superadmin","schooladmin","teacher","student","parent"],
    required: true
  },

  schoolId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "School",  
    required: function() { return this.role !== "superadmin"; } 
  },

  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },

  section: { type: String, default: null },

  birthDate: { type: Date, default: null },

  childrenIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  parentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
     sparse: true,
     default:null

  },

  parentPhone: { type: String, default: null },

  isActivated: { type: Boolean, default: false },

  nationalId: { type: String, unique: true, sparse: true},

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);

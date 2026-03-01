// controllers/schoolAdmin.controller.js
const User = require("../models/user");
const School = require("../models/school");
const mongoose = require("mongoose");

async function listSchoolAdmins(req, res, next) {
  try {
    const admins = await User.find({ role: "schooladmin" })
      .populate({ path: "schoolId", select: "name _id" })
      .lean();
    res.json({ ok: true, data: admins });
  } catch (err) {
    next(err);
  }
}

async function createSchoolAdmin(req, res, next) {
  try {
    const { name, schoolId } = req.body;

    if (!name || !schoolId)
      return res.status(400).json({ ok: false, message: "Name and schoolId required" });

    if (!mongoose.Types.ObjectId.isValid(schoolId))
      return res.status(400).json({ ok: false, message: "Invalid schoolId" });

    const school = await School.findById(schoolId);
    if (!school) return res.status(404).json({ ok: false, message: "School not found" });

    const newAdmin = await User.create({ name, schoolId, role: "schooladmin", isActivated: false });

    res.status(201).json({ ok: true, data: newAdmin });
  } catch (err) {
    next(err);
  }
}

async function updateSchoolAdmin(req, res, next) {
  try {
    const { id } = req.params;
    const { name, schoolId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ ok: false, message: "Invalid admin ID" });

    const admin = await User.findById(id);
    if (!admin || admin.role !== "schooladmin")
      return res.status(404).json({ ok: false, message: "School Admin not found" });

    if (name) admin.name = name;
    if (schoolId) admin.schoolId = schoolId;

    await admin.save();
    res.json({ ok: true, data: admin });
  } catch (err) {
    next(err);
  }
}

async function deleteSchoolAdmin(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ ok: false, message: "Invalid admin ID" });

    const admin = await User.findById(id);
    if (!admin || admin.role !== "schooladmin")
      return res.status(404).json({ ok: false, message: "School Admin not found" });

    await User.findByIdAndDelete(id);
    res.json({ ok: true, message: "School Admin deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listSchoolAdmins,
  createSchoolAdmin,
  updateSchoolAdmin,
  deleteSchoolAdmin,
};
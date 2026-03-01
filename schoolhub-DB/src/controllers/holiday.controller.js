// controllers/holiday.controller.js
const Holiday = require("../models/Holiday");

// ================= List All Holidays =================
async function listHolidays(req, res, next) {
  try {
    const holidays = await Holiday.find().sort({ date: 1 });
    res.json({ ok: true, data: holidays });
  } catch (err) {
    next(err);
  }
}

// ================= Create Holiday =================
async function createHoliday(req, res, next) {
  try {
    const { name, date } = req.body;
    if (!name || !date)
      return res.status(400).json({ ok: false, message: "Name and Date required" });

    const newHoliday = await Holiday.create({ name, date });
    res.status(201).json({ ok: true, data: newHoliday });
  } catch (err) {
    next(err);
  }
}

// ================= Delete Holiday =================
async function deleteHoliday(req, res, next) {
  try {
    const { id } = req.params;
    const holiday = await Holiday.findById(id);
    if (!holiday) return res.status(404).json({ ok: false, message: "Holiday not found" });

    await Holiday.findByIdAndDelete(id);
    res.json({ ok: true, message: "Holiday deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listHolidays,
  createHoliday,
  deleteHoliday,
};
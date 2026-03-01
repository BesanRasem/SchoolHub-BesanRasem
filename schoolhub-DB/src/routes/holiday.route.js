// routes/holiday.route.js
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validate = require("../middlewares/validate");
const { auth, superAdmin } = require("../middlewares/auth");
const holidayController = require("../controllers/holiday.controller");

// ================= GET all holidays =================
router.get("/", auth, holidayController.listHolidays);

// ================= POST create holiday =================
router.post(
  "/",
  auth,
  superAdmin,
  body("name").notEmpty().withMessage("Name required"),
  body("date").notEmpty().withMessage("Date required"),
  validate,
  holidayController.createHoliday
);

// ================= DELETE holiday =================
router.delete("/:id", auth, superAdmin, holidayController.deleteHoliday);

module.exports = router;
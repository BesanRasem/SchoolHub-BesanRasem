const express = require("express");
const { body } = require("express-validator");
const { auth, teacher } = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const scheduleController = require("../controllers/schedule.controller");

const router = express.Router();

router.get("/", auth,  scheduleController.listSchedule);

router.post(
  "/create",
  auth,
  teacher,
  body("classId").notEmpty().isMongoId(),
  body("subjectId").notEmpty().isMongoId(),
  body("day").notEmpty().isIn(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]),
  body("startTime").notEmpty(),
  body("endTime").notEmpty(),
  validate,
  scheduleController.createSchedule
);

router.put(
  "/:id",
  auth,
  teacher,
  body("day").optional().isIn(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]),
  validate,
  scheduleController.updateSchedule
);

router.delete("/:id", auth, teacher, scheduleController.deleteSchedule);

module.exports = router;
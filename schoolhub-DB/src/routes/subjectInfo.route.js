const express = require("express");
const router = express.Router();
const { auth, teacher } = require("../middlewares/auth");
const subjectController = require("../controllers/subjectInfo.controller");

router.post("/update-info", auth, teacher, subjectController.saveSubjectInfo);
router.get("/info", auth, teacher, subjectController.getSubjectInfo);

module.exports = router;
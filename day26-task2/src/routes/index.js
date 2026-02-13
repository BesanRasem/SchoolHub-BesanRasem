const express = require("express");
const studentsRoutes = require("./students.routes");

const router = express.Router();

router.get("/health", (_req, res) => {
    res.json({ ok: true, message: "API is healthy" });
});

router.use("/students", studentsRoutes);

module.exports = router;

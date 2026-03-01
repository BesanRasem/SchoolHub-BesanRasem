const express = require("express");
const studentsRoutes = require("./students.routes");
const authRoutes = require("./auth.routes");
const dashboardRoutes = require("./dashboard.routes");



const router = express.Router();

router.get("/health", (_req, res) => {
    res.json({ ok: true, message: "API is healthy" });
});

router.use("/students", studentsRoutes);
router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);



module.exports = router;

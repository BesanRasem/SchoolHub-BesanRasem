const express = require("express");
const userRoutes = require("./user.route");
const router = express.Router();
const schoolRoutes =require("./school.route")
const classRoutes =require("./class.route")


router.get("/health", (_req, res) => {
    res.json({ ok: true, message: "API is healthy" });
});


router.use("/users", userRoutes);
router.use("/schools",schoolRoutes);
router.use("/class",classRoutes)


module.exports = router;

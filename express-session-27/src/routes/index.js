const express = require("express");
const usersRoutes = require("./products.routes");
const profileRoutes=require("./profile.route")

const router = express.Router();

router.get("/health", (_req, res) => {
    res.json({ ok: true, message: "API is healthy" });
});

router.use("/users", usersRoutes);

module.exports = router;

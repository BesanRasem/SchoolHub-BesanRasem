const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");


router.get("/health", (_req, res) => {
    res.json({ ok: true, message: "API is healthy" });
});


router.use("/users", userRoutes);


module.exports = router;

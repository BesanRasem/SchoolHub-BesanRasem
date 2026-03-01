const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/", auth, (req, res) => {
    res.json({
        ok: true,
        role: req.user.role
    });
});

module.exports = router;
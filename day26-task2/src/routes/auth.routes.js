const express = require("express");
const router = express.Router();
const Student = require("../models/students");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await Student.findOne({ email, password });

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

       const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: "student"
        },
        process.env.AUTH_TOKEN, 
        { expiresIn: "24h" }     
    );
    res.json({ token });

});

module.exports = router;

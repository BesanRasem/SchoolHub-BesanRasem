const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

async function createUser(req, res, next) {
    try {
        const { name, role,  classId, nationalId } = req.body;

        // توليد الأكواد الداخلية حسب الدور
        let studentCode, parentCode, teacherCode;
        if (role === "student") studentCode = generateRandomCode();
        if (role === "parent") parentCode = generateRandomCode();
        if (role === "teacher") teacherCode = generateRandomCode();

        const newUser = await User.create({
            name,
            role,
            schoolId,
            classId,
            nationalId,
            studentCode,
            parentCode,
            teacherCode,
        });

        res.status(201).json({
            ok: true,
            message: "User created successfully",
            data: newUser,
        });

    } catch (err) {
        next(err);
    }
}

// ======= 2️⃣ تفعيل الحساب بالكود =======
async function activateUser(req, res, next) {
    try {
        const { code, email, password } = req.body;

        // البحث عن الكود بين الطلاب والمعلمين والآباء
        const user = await User.findOne({
            $or: [
                { studentCode: code },
                { parentCode: code },
                { teacherCode: code }
            ]
        });

        if (!user) throw new ApiError("Invalid activation code", 400);
        if (user.isActivated) throw new ApiError("Account already activated", 400);

        // حفظ email + password مشفر
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        user.isActivated = true;

        

        await user.save();

        res.json({ ok: true, message: "Account activated successfully" });

    } catch (err) {
        next(err);
    }
}

// ======= 3️⃣ تسجيل الدخول =======
async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw new ApiError("User not found", 404);
        if (!user.isActivated) throw new ApiError("Account not activated", 400);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new ApiError("Invalid credentials", 401);

        // توليد JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ ok: true, token, data: user });

    } catch (err) {
        next(err);
    }
}

// ======= 4️⃣ نسيت كلمة السر =======
async function forgotPassword(req, res, next) {
    try {
        const { email, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw new ApiError("User not found", 404);

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ ok: true, message: "Password updated successfully" });

    } catch (err) {
        next(err);
    }
}
async function listUsers(req, res, next) {
    try {
        const users = await User.find({ schoolId: req.user.schoolId })
            .sort({ createdAt: -1 });
        res.json({ ok: true, data: users });
    } catch (err) {
        next(err);
    }
}
function generateRandomCode(length = 8) {
    return Math.random().toString(36).substr(2, length).toUpperCase();
}

module.exports = {
    createUser,
    activateUser,
    login,
    forgotPassword,
    listUsers
};

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const UserToken = require("../models/userToken");
const School = require("../models/school");
const Class = require("../models/class");


function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role, schoolId: user.schoolId },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } 
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" } 
  );
}

async function createSuperAdmin(req, res, next) {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ role: "superadmin" });
        if (existing) {
            return res.status(400).json({
                ok: false,
                message: "SuperAdmin already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const superAdmin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "superadmin",
            schoolId: null,
            isActivated: true
        });

        res.status(201).json({
            ok: true,
            message: "SuperAdmin created successfully",
            data: superAdmin
        });

    } catch (err) {
        next(err);
    }
}
async function createSchoolAdmin(req, res, next) {
  try {
    const { name, schoolId } = req.body;

    if (!schoolId) {
      return res.status(400).json({
        ok: false,
        message: "schoolId is required"
      });
    }

    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({
        ok: false,
        message: "School not found"
      });
    }



    const newAdmin = await User.create({
      name,
      role: "schooladmin",
      schoolId,
      isActivated: false
    });

    res.status(201).json({
      ok: true,
      message: "SchoolAdmin created successfully",
      data: newAdmin
    });

  } catch (err) {
    next(err);
  }
}

async function activateUser(req, res, next) {
  try {
    const { userId, email, password } = req.body;

    if (!userId || !email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Missing required field(s): userId, email, password"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    if (user.isActivated) {
      return res.status(400).json({ ok: false, message: "Account already activated" });
    }

    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.isActivated = true;

    await user.save();

    res.json({
      ok: true,
      message: "Account activated successfully",
      data: user
    });

  } catch (err) {
    next(err);
  }
}
async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw new ApiError("User not found", 404);
        if (!user.isActivated) throw new ApiError("Account not activated", 400);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new ApiError("Invalid credentials", 401);
 

         const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await UserToken.create({
    userId: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7*24*60*60*1000), 
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,      
    sameSite: "Strict",
    maxAge: 7*24*60*60*1000
  });

 


        res.json({ ok: true, accessToken, data: user });

    } catch (err) {
        next(err);
    }
}




async function refresh(req, res, next){
    try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token" });
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const dbToken = await UserToken.findOne({
      userId: decoded.id,
      token: refreshToken,
      loggedOutAt: null,
      expiresAt: { $gt: new Date() }
    });
    if (!dbToken) return res.status(401).json({ message: "Refresh token invalid or expired" });
     const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });
        const accessToken = generateAccessToken(user);
            res.json({ accessToken, user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

async function logout(req, res, next) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    await UserToken.findOneAndUpdate(
      { token: refreshToken },
      { loggedOutAt: new Date() }
    );

    res.clearCookie("refreshToken");

    res.json({
      ok: true,
      message: "Logged out successfully"
    });

  } catch (err) {
    next(err);
  }
}
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


async function createUser(req, res, next) {
  try {
    const {
      name,
      role,
      nationalId,      // optional
      classId,
      birthDate,
      parentName,
      parentNationalId, // optional
      parentPhone,
    } = req.body;

    const schoolId = req.user.schoolId;

    // =========================
    // 1️⃣ تحقق أساسي
    // =========================
    if (!name || !role) {
      return res.status(400).json({
        ok: false,
        message: "Name and role are required"
      });
    }

    // =========================
    // 2️⃣ تحقق من الصف إذا انبعت
    // =========================
    if (classId) {
      const existingClass = await Class.findOne({
        _id: classId,
        schoolId
      });

      if (!existingClass) {
        return res.status(404).json({
          ok: false,
          message: "Class not found in this school"
        });
      }
    }

    let parent = null;

    // =========================
    // 3️⃣ منطق الطالب
    // =========================
    if (role === "student") {

      // تحقق من بيانات الأب
      if (!parentName && !parentNationalId && !parentPhone) {
        return res.status(400).json({
          ok: false,
          message: "Parent information is required for students"
        });
      }

      // =========================
      // 3a️⃣ البحث عن الأب الذكي
      // =========================
      const parentQuery = {
        role: "parent",
        schoolId
      };

      if (parentNationalId) {
        // إذا عنده رقم وطني → تحقق على nationalId فقط
        parentQuery.nationalId = parentNationalId;
      } else if (parentPhone) {
        // إذا ما عنده رقم → تحقق على الاسم + الهاتف
        parentQuery.name = parentName;
        parentQuery.parentPhone = parentPhone;
      } else {
        // fallback على الاسم فقط
        parentQuery.name = parentName;
      }

      parent = await User.findOne(parentQuery);

      // إنشاء الأب إذا غير موجود
      if (!parent) {
        parent = await User.create({
          name: parentName,
          nationalId: parentNationalId || null,
          parentPhone: parentPhone || null,
          role: "parent",
          schoolId,
          isActivated: false,
          childrenIds: []
        });
      }

      // =========================
      // 3b️⃣ تحقق من الطالب الذكي
      // =========================
      const studentQuery = {
        role: "student",
        schoolId
      };

      if (nationalId) {
        // إذا عنده رقم وطني → تحقق على nationalId فقط
        studentQuery.nationalId = nationalId;
      } else {
        // إذا ما عنده رقم → تحقق على الاسم + DOB + parentId
        studentQuery.name = name;
        studentQuery.birthDate = birthDate;
        studentQuery.parentId = parent._id;
      }

      const existingStudent = await User.findOne(studentQuery);

      if (existingStudent) {
        return res.status(400).json({
          ok: false,
          message: "Student already exists in this school"
        });
      }
    }

    // =========================
    // 4️⃣ بناء بيانات المستخدم
    // =========================
    const newUserData = {
      name,
      role,
      schoolId,
      nationalId: nationalId || null,  // optional
      classId: classId || null,
      birthDate: birthDate || null,
      isActivated: false
    };

    if (role === "student" && parent) {
      newUserData.parentId = parent._id;
    }

    // =========================
    // 5️⃣ إنشاء المستخدم
    // =========================
    const newUser = await User.create(newUserData);

    // =========================
    // 6️⃣ ربط الطالب بالأب
    // =========================
    if (role === "student" && parent) {
      parent.childrenIds.push(newUser._id);
      await parent.save();
    }

    // =========================
    // 7️⃣ الرد النهائي
    // =========================
    res.status(201).json({
      ok: true,
      message: "User created successfully",
      data: {
        user: newUser,
        parent: parent || null
      }
    });

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







module.exports = {
    createUser,
    activateUser,
    login,
    forgotPassword,
    listUsers,
    createSuperAdmin,
    createSchoolAdmin,
    logout,
    refresh
};

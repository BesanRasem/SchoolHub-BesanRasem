const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const UserToken = require("../models/userToken");
const School = require("../models/school");
const Class = require("../models/class");
const mongoose = require("mongoose");


function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role, schoolId: user.schoolId ,classId:user.classId},
    process.env.JWT_SECRET,
    { expiresIn: "15m" } 
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_SECRET,
    { expiresIn: "5h" } 
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
        const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        ok: false,
        message: "Email already in use"
      });
    }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        ok: false,
        message: "Invalid user ID format"
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
    expiresAt: new Date(Date.now() + 5*60*60*1000), 
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,      
    sameSite: "Strict",
    maxAge: 5*60*60*1000
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
      nationalId,
      classId,
      birthDate,
      parentName,
      parentNationalId,
      parentPhone,
    } = req.body;

    const schoolId = req.user.schoolId;

    if (!name) {
      return res.status(400).json({ ok: false, message: "Name is required" });
    }

    if (!role || !["student", "teacher", "parent"].includes(role)) {
      return res.status(400).json({ ok: false, message: "Role must be student, teacher, or parent" });
    }

    if (classId) {
      if (!mongoose.Types.ObjectId.isValid(classId)) {
        return res.status(400).json({ ok: false, message: "Invalid classId format" });
      }
      const existingClass = await Class.findOne({ _id: classId, schoolId });
      if (!existingClass) {
        return res.status(404).json({ ok: false, message: "Class not found in this school" });
      }
    }

    let parent = null;

    if (role === "student") {

      if (!parentNationalId) {
        return res.status(400).json({ ok: false, message: "Parent National ID is required" });
      }
      if (!parentName) {
        return res.status(400).json({ ok: false, message: "Parent name is required" });
      }
      if (!parentPhone) {
        return res.status(400).json({ ok: false, message: "Parent phone is required" });
      }

      parent = await User.findOne({
        role: "parent",
        schoolId,
        nationalId: parentNationalId
      });

      if (!parent) {
        parent = await User.create({
          name: parentName,
          nationalId: parentNationalId,
          parentPhone,
          role: "parent",
          schoolId,
          isActivated: false,
          childrenIds: []
        });
      }
    }

    if (nationalId) {
      const existingUser = await User.findOne({ nationalId, schoolId });
      if (existingUser) {
        return res.status(400).json({ ok: false, message: "National ID already exists" });
      }
    }

    const newUserData = {
      name,
      role,
      schoolId,
      nationalId: nationalId || null,
      classId: classId || null,
      birthDate: birthDate || null,
    };

    if (role === "student" && parent) {
      newUserData.parentId = parent._id;
    }

    const newUser = await User.create(newUserData);

    // 6️⃣ تحديث الأب → إضافة الطالب لقائمة الأطفال
    if (role === "student" && parent) {
      if (!parent.childrenIds.includes(newUser._id)) {
        parent.childrenIds.push(newUser._id);
        await parent.save();
      }
    }

    res.status(201).json({
      ok: true,
      message: "User created successfully",
      data: { user: newUser, parent: parent || null }
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        ok: false,
        message: "National ID already exists"
      });
    }

    next(err);
  }
}

 
async function listStudentsWithParent(req, res, next) {
  try {
    const { page = 1, limit = 10, search = "", classId } = req.query;
    const skip = (page - 1) * limit;

    const query = { schoolId: req.user.schoolId, role: "student" };

    if (classId) query.classId = classId;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
         { _id: { $regex: search, $options: "i" } },
        { nationalId: { $regex: search, $options: "i" } }
      ];
    }

    const [students, total] = await Promise.all([
      User.find(query)
        .sort({ createdAt: -1 })
        .skip(Number(skip))
        .limit(Number(limit))
        .populate({ path: "parentId", select: "name email parentPhone nationalId" })
         .populate({ path: "classId", select: "grade section" }) 
        .lean(),
      User.countDocuments(query)
    ]);

    res.json({
      ok: true,
      data: students,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });

  } catch (err) {
    next(err);
  }
}
async function deleteTeacher(req, res) {
  try {
    const teacherId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ ok: false, message: "Invalid teacher ID" });
    }

    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== "teacher") {
      return res.status(404).json({ ok: false, message: "Teacher not found" });
    }

    await User.findByIdAndDelete(teacherId);

    res.json({ ok: true, message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
}
async function deleteStudent(req, res) {
  const student = await User.findById(req.params.id);

  if (!student || student.role !== "student") {
    return res.status(404).json({ ok: false, message: "Student not found" });
  }

  const parentId = student.parentId;

  await User.findByIdAndDelete(student._id);

  if (parentId) {
    const siblings = await User.countDocuments({
      parentId,
      role: "student"
    });

    if (siblings === 0) {
      await User.findByIdAndDelete(parentId);
    }
  }

  res.json({
    ok: true,
    message: "Student deleted successfully"
  });
}
async function updateStudent(req, res) {
  try {
    const studentId = req.params.id;
    const {
      name,
      birthDate,
      nationalId,
      classId,
      parentName,
      parentNationalId,
      parentPhone
    } = req.body;

    const schoolId = req.user.schoolId;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ ok: false, message: "Invalid student ID" });
    }

    const student = await User.findOne({
      _id: studentId,
      role: "student",
      schoolId
    });

    if (!student) {
      return res.status(404).json({ ok: false, message: "Student not found" });
    }

    if (nationalId) {
      const existingStudent = await User.findOne({
        _id: { $ne: studentId },
        role: "student",
        schoolId,
        nationalId
      });

      if (existingStudent) {
        return res.status(400).json({
          ok: false,
          message: "National ID already used by another student"
        });
      }
    }

    if (name) student.name = name;
    if (birthDate) student.birthDate = birthDate;
    if (nationalId) student.nationalId = nationalId;
    if (classId) student.classId = classId;

    let parent = await User.findOne({
      role: "parent",
      schoolId,
      nationalId: parentNationalId
    });

    if (!parent) {
      parent = await User.create({
        name: parentName,
        nationalId: parentNationalId,
        parentPhone,
        role: "parent",
        schoolId,
        isActivated: false,
        childrenIds: []
      });
    }

    const oldParentId = student.parentId;

    // ربط الطالب بالأب الجديد
    student.parentId = parent._id;
    await student.save();

    // إضافة الطالب لقائمة الأب الجديد
    if (!parent.childrenIds.includes(student._id)) {
      parent.childrenIds.push(student._id);
      await parent.save();
    }

    if (
      oldParentId &&
      oldParentId.toString() !== parent._id.toString()
    ) {
      const siblingsCount = await User.countDocuments({
        parentId: oldParentId,
        role: "student"
      });

      if (siblingsCount === 0) {
        await User.findByIdAndDelete(oldParentId);
      }
    }

    res.json({
      ok: true,
      message: "Student updated successfully",
      data: student
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        ok: false,
        message: "National ID already exists"
      });
    }

    res.status(500).json({ ok: false, message: err.message });
  }
}
async function listTeachers(req, res, next) {
  try {
    const teachers = await User.find({
      schoolId: req.user.schoolId,
      role: "teacher",
    })
    .sort({ createdAt: -1 })

    res.json({
      ok: true,
      data: teachers
    });
  } catch (err) {
    next(err);
  }
}
async function updateTeacher(req, res) {
  try {
    const teacherId = req.params.id;
    const { name, classId } = req.body;
    const schoolId = req.user.schoolId;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ ok: false, message: "Invalid teacher ID" });
    }

    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== "teacher") {
      return res.status(404).json({ ok: false, message: "Teacher not found" });
    }

    if (name) teacher.name = name;

    if (classId) {
      const classExists = await Class.findOne({ _id: classId, schoolId });
      if (!classExists) {
        return res.status(404).json({ ok: false, message: "Class not found in this school" });
      }
      teacher.classId = classId;
    }

    await teacher.save();

    res.json({
      ok: true,
      message: "Teacher updated successfully",
      data: teacher
    });

  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
}


async function createTeacher(req, res, next) {
  try {
    const { name, classId } = req.body;
    const schoolId = req.user.schoolId; 

    if (!name) {
      return res.status(400).json({ ok: false, message: "Teacher name is required" });
    }

    if (classId) {
      if (!mongoose.Types.ObjectId.isValid(classId)) {
        return res.status(400).json({ ok: false, message: "Invalid classId" });
      }
      const existingClass = await Class.findOne({ _id: classId, schoolId });
      if (!existingClass) {
        return res.status(404).json({ ok: false, message: "Class not found in this school" });
      }
    }

    const newTeacher = await User.create({
      name,
      role: "teacher",
      schoolId,
      classId: classId || null,
      isActivated: false
    });

    res.status(201).json({ ok: true, message: "Teacher created successfully", data: newTeacher });

  } catch (err) {
    next(err);
  }
}
const getStudentsByClass = async (req, res, next) => {
  try {
    const { classId, page = 1, limit = 10 } = req.query;

    if (!classId) {
      return res.status(400).json({ message: "classId required" });
    }

    const skip = (page - 1) * limit;

    const objectClassId = new mongoose.Types.ObjectId(classId);

    const [students, total] = await Promise.all([
      User.find({
        classId: objectClassId,
        role: "student",
        schoolId: req.user.schoolId
      })
        .select("name _id")
        .skip(skip)
        .limit(Number(limit))
        .lean(),

      User.countDocuments({
        classId: objectClassId,
        role: "student",
        schoolId: req.user.schoolId
      })
    ]);

    res.json({
      ok: true,
      data: students,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
    createUser,
    activateUser,
    login,
    forgotPassword,
    listStudentsWithParent,
    createSuperAdmin,
    createSchoolAdmin,
    logout,
    refresh,
    deleteStudent,
    updateStudent,
    listTeachers,
    updateTeacher,
    createTeacher,
    getStudentsByClass,
    deleteTeacher

};

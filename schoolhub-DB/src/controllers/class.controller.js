const Class = require("../models/class");

async function createClass(req, res, next) {
  try {
    const { grade, section } = req.body;

    const newClass = await Class.create({
      grade,
      section,
      schoolId: req.user.schoolId,
    });

    res.status(201).json({ ok: true, data: newClass });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        ok: false,
        message: "Class already exists in this school",
      });
    }
    next(err);
  }
}



async function listClasses(req, res, next) {
  try {
    const query = {
      schoolId: req.user.schoolId, 
    };

    const classes = await Class.find(query)
      .populate("homeroomTeacher", "name");

    res.json({
      ok: true,
      total: classes.length, 
      data: classes,        
    });

  } catch (err) {
    next(err);
  }
}


async function deleteClass(req, res, next) {
  try {
    const classId = req.params.id;

    const classDoc = await Class.findOne({
      _id: classId,
      schoolId: req.user.schoolId,
    });

    if (!classDoc) {
      return res.status(404).json({ message: "Class not found" });
    }

    await Class.deleteOne({ _id: classId });

    await User.updateMany(
      { classId },
      { $unset: { classId: "" } } 
    );

    res.json({ ok: true, message: "Class deleted and removed from students" });

  } catch (err) {
    next(err);
  }
}



async function setAdminClass(req, res, next) {
  try {
    const { teacherId } = req.body;

    const teacher = await User.findOne({
      _id: teacherId,
      role: "teacher",
      schoolId: req.user.schoolId,
    });

    if (!teacher) {
      return res.status(400).json({
        message: "Teacher not found in this school",
      });
    }

    await Class.findByIdAndUpdate(req.params.id, {
      homeroomTeacher: teacherId,
    });

    res.json({ ok: true, message: "Homeroom teacher updated" });

  } catch (err) {
    next(err);
  }
}

module.exports = {
  createClass,
  listClasses,
  deleteClass,
  setAdminClass,
};

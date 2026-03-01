const School = require("../models/school");

async function createSchool(req, res, next) {
  try {
    const { name, address } = req.body;

    const school = await School.create({
      name,
      address
    });

    res.status(201).json({
      ok: true,
      data: school
    });
  } catch (err) {
    next(err);
  }
}
async function getSchools(req, res, next) {
  try {
    const schools = await School.find().sort({ createdAt: -1 });

    res.json({
      ok: true,
      data: schools
    });
  } catch (err) {
    next(err);
  }
}
async function updateSchool(req, res, next) {
  try {
    const { id } = req.params;
    const { name, address } = req.body;

    const school = await School.findByIdAndUpdate(
      id,
      { name, address },
      { new: true }
    );

    res.json({
      ok: true,
      data: school
    });
  } catch (err) {
    next(err);
  }
}

// DELETE
async function deleteSchool(req, res, next) {
  try {
    const { id } = req.params;

    await School.findByIdAndDelete(id);

    res.json({
      ok: true,
      message: "School deleted successfully"
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { createSchool , getSchools,updateSchool ,deleteSchool};

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

module.exports = { createSchool };

const students = require("../models/students");
const ApiError = require("../utils/ApiError");

async function list(req, res, next) {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const q = req.query.q || "";

        const filter = {};
        if (q) filter.fullName = { $regex: q, $options: "i" };

        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            students.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            students.countDocuments(filter),
        ]);

        res.json({
            ok: true,
            data: items,
            meta: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (e) {
        next(e);
    }
}

async function getById(req, res, next) {
    try {
        const { id } = req.params;

        const Student = await students.findById(id);
        if (!Student) throw new ApiError("student not found", 404);

        res.json({ ok: true, data: Student });
    } catch (e) {
        next(e);
    }
}

async function create(req, res, next) {
    try {
        const created = await students.create(req.body);

        res.status(201).json({
            ok: true,
            message: "students  created",
            data: created,
        });
    } catch (e) {
        next(e);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;

        const updated = await students.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updated) throw new ApiError("student not found", 404);

        res.json({
            ok: true,
            message: "student updated",
            data: updated,
        });
    } catch (e) {
        next(e);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;

        const deleted = await students.findByIdAndDelete(id);
        if (!deleted) throw new ApiError("student not found", 404);

        res.json({
            ok: true,
            message: "student deleted",
            data: deleted,
        });
    } catch (e) {
        next(e);
    }
}

module.exports = { list, getById, create, update, remove };

const Product = require("../models/Product");
const ApiError = require("../utils/ApiError");

// GET /api/products?page=1&limit=10&q=phone&inStock=true
async function list(req, res, next) {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const q = req.query.q || "";
        const inStock = req.query.inStock;

        const filter = {};
        if (q) filter.name = { $regex: q, $options: "i" };
        if (typeof inStock === "boolean") filter.inStock = inStock;

        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Product.countDocuments(filter),
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

// GET /api/products/:id
async function getById(req, res, next) {
    try {
        const { id } = req.params;

        const item = await Product.findById(id);
        if (!item) throw new ApiError("Product not found", 404);

        res.json({ ok: true, data: item });
    } catch (e) {
        next(e);
    }
}

// POST /api/products
async function create(req, res, next) {
    try {
        const created = await Product.create(req.body);

        res.status(201).json({
            ok: true,
            message: "Product created",
            data: created,
        });
    } catch (e) {
        next(e);
    }
}

// PATCH /api/products/:id
async function update(req, res, next) {
    try {
        const { id } = req.params;

        const updated = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updated) throw new ApiError("Product not found", 404);

        res.json({
            ok: true,
            message: "Product updated",
            data: updated,
        });
    } catch (e) {
        next(e);
    }
}

// DELETE /api/products/:id
async function remove(req, res, next) {
    try {
        const { id } = req.params;

        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) throw new ApiError("Product not found", 404);

        res.json({
            ok: true,
            message: "Product deleted",
            data: deleted,
        });
    } catch (e) {
        next(e);
    }
}

module.exports = { list, getById, create, update, remove };

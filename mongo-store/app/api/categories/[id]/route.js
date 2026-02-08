import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import { ok, fail } from "@/lib/response";

function cleanId(raw) {
    return String(raw || "").trim().replace(/\/$/, "");
}

export async function GET(_req, context) {
    try {
        await connectDB();

        const { id: rawId } = await context.params; // ✅ مهم
        const id = cleanId(rawId);

        if (!mongoose.Types.ObjectId.isValid(id)) return fail("Invalid category id", 400);

        const category = await Category.findById(id);
        if (!category) return fail("Category not found", 404);

        return ok(category);
    } catch (e) {
        return fail("Failed to fetch category", 500, e.message);
    }
}

export async function PATCH(req, context) {
    try {
        await connectDB();

        const { id: rawId } = await context.params;
        const id = cleanId(rawId);

        if (!mongoose.Types.ObjectId.isValid(id)) return fail("Invalid category id", 400);

        const body = await req.json();
        const updated = await Category.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!updated) return fail("Category not found", 404);
        return ok(updated);
    } catch (e) {
        return fail("Failed to update category", 400, e.message);
    }
}

export async function DELETE(_req, context) {
    try {
        await connectDB();

        const { id: rawId } = await context.params;
        const id = cleanId(rawId);

        if (!mongoose.Types.ObjectId.isValid(id)) return fail("Invalid category id", 400);

        const deleted = await Category.findByIdAndDelete(id);
        if (!deleted) return fail("Category not found", 404);

        return ok({ deleted: true });
    } catch (e) {
        return fail("Failed to delete category", 400, e.message);
    }
}
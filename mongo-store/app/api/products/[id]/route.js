import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { ok, fail } from "@/lib/response";

function cleanId(raw) {
    return String(raw || "").trim().replace(/\/$/, "");
}

export async function GET(_req, context) {
    try {
        await connectDB();

        const { id: rawId } = await context.params;
        const id = cleanId(rawId);

        if (!mongoose.Types.ObjectId.isValid(id)) return fail("Invalid product id", 400);

        const product = await Product.findById(id).populate("category");
        if (!product) return fail("Product not found", 404);

        return ok(product);
    } catch (e) {
        return fail("Failed to fetch product", 500, e.message);
    }
}

export async function PATCH(req, context) {
    try {
        await connectDB();

        const { id: rawId } = await context.params;
        const id = cleanId(rawId);

        if (!mongoose.Types.ObjectId.isValid(id)) return fail("Invalid product id", 400);

        const body = await req.json();

        const updated = await Product.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        }).populate("category");

        if (!updated) return fail("Product not found", 404);

        return ok(updated);
    } catch (e) {
        return fail("Failed to update product", 400, e.message);
    }
}

export async function DELETE(_req, context) {
    try {
        await connectDB();

        const { id: rawId } = await context.params;
        const id = cleanId(rawId);

        if (!mongoose.Types.ObjectId.isValid(id)) return fail("Invalid product id", 400);

        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) return fail("Product not found", 404);

        return ok({ deleted: true });
    } catch (e) {
        return fail("Failed to delete product", 400, e.message);
    }
}

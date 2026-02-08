import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { ok, fail } from "@/lib/response";

function cleanId(raw) {
    return String(raw || "").trim().replace(/\/$/, "");
}

export async function GET(_req, context) {
    try {
        await connectDB();

        const { id: rawId } = await context.params;
        const id = cleanId(rawId);

        if (!mongoose.Types.ObjectId.isValid(id)) return fail("Invalid order id", 400);

        const order = await Order.findById(id)
            .populate("user", "-password")
            .populate("items.product");

        if (!order) return fail("Order not found", 404);

        return ok(order);
    } catch (e) {
        return fail("Failed to fetch order", 500, e.message);
    }
}

export async function PATCH(req, context) {
    try {
        await connectDB();

        const { id: rawId } = await context.params;
        const id = cleanId(rawId);

        if (!mongoose.Types.ObjectId.isValid(id)) return fail("Invalid order id", 400);

        const body = await req.json();

        // Tip: for teaching, allow only status updates here
        // (prevent editing items/total without proper logic)
        const updated = await Order.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        )
            .populate("user", "-password")
            .populate("items.product");

        if (!updated) return fail("Order not found", 404);

        return ok(updated);
    } catch (e) {
        return fail("Failed to update order", 400, e.message);
    }
}

export async function DELETE(_req, context) {
    try {
        await connectDB();

        const { id: rawId } = await context.params;
        const id = cleanId(rawId);

        if (!mongoose.Types.ObjectId.isValid(id)) return fail("Invalid order id", 400);

        const deleted = await Order.findByIdAndDelete(id);
        if (!deleted) return fail("Order not found", 404);

        return ok({ deleted: true });
    } catch (e) {
        return fail("Failed to delete order", 400, e.message);
    }
}

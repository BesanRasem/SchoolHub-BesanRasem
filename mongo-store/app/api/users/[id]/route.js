import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { ok, fail } from "@/lib/response";

function cleanId(raw) {
    return String(raw || "").trim().replace(/\/$/, "");
}

export async function GET(_req, context) {
    try {
        await connectDB();

        const { id: rawId } = await context.params;
        const id = cleanId(rawId);

        if (!mongoose.Types.ObjectId.isValid(id)) return fail("Invalid user id", 400);

        const user = await User.findById(id).select("-password");
        if (!user) return fail("User not found", 404);

        return ok(user);
    } catch (e) {
        return fail("Failed to fetch user", 500, e.message);
    }
}

export async function PATCH(req, context) {
    try {
        await connectDB();

        const { id: rawId } = await context.params;
        const id = cleanId(rawId);

        if (!mongoose.Types.ObjectId.isValid(id)) return fail("Invalid user id", 400);

        const body = await req.json();

        // avoid returning password
        const updated = await User.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        }).select("-password");

        if (!updated) return fail("User not found", 404);

        return ok(updated);
    } catch (e) {
        // duplicate email
        if (e.code === 11000) return fail("Email already exists", 409);
        return fail("Failed to update user", 400, e.message);
    }
}

export async function DELETE(_req, context) {
    try {
        await connectDB();

        const { id: rawId } = await context.params;
        const id = cleanId(rawId);

        if (!mongoose.Types.ObjectId.isValid(id)) return fail("Invalid user id", 400);

        const deleted = await User.findByIdAndDelete(id);
        if (!deleted) return fail("User not found", 404);

        return ok({ deleted: true });
    } catch (e) {
        return fail("Failed to delete user", 400, e.message);
    }
}

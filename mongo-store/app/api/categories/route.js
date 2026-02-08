import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import { ok, fail } from "@/lib/response";

export async function GET() {
    try {
        await connectDB();
        const categories = await Category.find().sort({ name: 1 });
        return ok(categories);
    } catch (e) {
        return fail("Failed to fetch categories", 500, e.message);
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const created = await Category.create(body);
        return ok(created, 201);
    } catch (e) {
        if (e.code === 11000) return fail("Category already exists", 409);
        return fail("Failed to create category", 400, e.message);
    }
}

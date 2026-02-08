import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { ok, fail } from "@/lib/response";

export async function GET() {
    try {
        await connectDB();
        const products = await Product.find().populate("category").sort({ createdAt: -1 });
        return ok(products);
    } catch (e) {
        return fail("Failed to fetch products", 500, e.message);
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const created = await Product.create(body);
        const populated = await Product.findById(created._id).populate("category");
        return ok(populated, 201);
    } catch (e) {
        return fail("Failed to create product", 400, e.message);
    }
}

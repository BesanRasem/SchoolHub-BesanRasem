import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { ok, fail } from "@/lib/response";

export async function GET() {
    try {
        await connectDB();
        const orders = await Order.find()
            .populate("user", "-password")
            .populate("items.product")
            .sort({ createdAt: -1 });
        return ok(orders);
    } catch (e) {
        return fail("Failed to fetch orders", 500, e.message);
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        // body: { user, items: [{ product, qty }] }

        const productIds = body.items.map((i) => i.product);
        const products = await Product.find({ _id: { $in: productIds } });

        const priceMap = new Map(products.map((p) => [String(p._id), p.price]));

        let total = 0;
        const items = body.items.map((i) => {
            const price = priceMap.get(String(i.product));
            if (price == null) throw new Error("Invalid product in items");
            total += price * i.qty;
            return { product: i.product, qty: i.qty, priceAtPurchase: price };
        });

        const created = await Order.create({
            user: body.user,
            items,
            total,
            status: "pending",
        });

        const populated = await Order.findById(created._id)
            .populate("user", "-password")
            .populate("items.product");

        return ok(populated, 201);
    } catch (e) {
        return fail("Failed to create order", 400, e.message);
    }
}

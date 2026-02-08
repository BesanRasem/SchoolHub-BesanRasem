import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                qty: { type: Number, required: true, min: 1 },
                priceAtPurchase: { type: Number, required: true, min: 0 },
            },
        ],
        total: { type: Number, required: true, min: 0 },
        status: { type: String, enum: ["pending", "paid", "cancelled"], default: "pending" },
    },
    { timestamps: true }
);

OrderSchema.index({ user: 1, createdAt: -1 });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

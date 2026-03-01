const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
        price: { type: Number, required: true, min: 0 },
        currency: { type: String, default: "USD", trim: true, maxlength: 10 },
        inStock: { type: Boolean, default: true },
        tags: [{ type: String, trim: true }],
        meta: { type: Object, default: {} }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
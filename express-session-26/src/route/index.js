const express = require("express");
const productsRoutes = require("./products.routes");

const router = express.Router();

router.get("/health", (_req, res) => {
    res.json({ ok: true, message: "API is healthy" });
});

router.use("/products", productsRoutes);

module.exports = router;

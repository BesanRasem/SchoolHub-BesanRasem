require("dotenv").config();

const createApp = require("./app");
const { connectDB } = require("./config/db");

async function start() {
    const app = createApp();

    const PORT = process.env.PORT || 3000;
    const MONGO_URI = process.env.MONGO_URI;

    try {
        await connectDB(MONGO_URI);

        console.log("connectDB =", connectDB);

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    }

    console.log("connectDB =", connectDB);
}

start();

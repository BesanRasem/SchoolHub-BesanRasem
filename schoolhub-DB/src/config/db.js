const mongoose = require("mongoose");

async function connectDB(mongoUri) {
    if (!mongoUri) throw new Error("MONGO_URI is missing");

    mongoose.set("strictQuery", true);// بيتاكد انه كويري بنعملها بتطابق مع السكيما 

    await mongoose.connect(mongoUri, {
        autoIndex: true,
    });

    console.log("MongoDB connected");
}

module.exports = { connectDB };

const mongoose = require("mongoose");

const userTokenSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  token: { 
    type: String, 
    required: true 
  },
  expiresAt: { 
    type: Date, 
    required: true 
  },
  loggedOutAt: { 
    type: Date, 
    default: null 
  }, 
});

module.exports = mongoose.model("UserToken", userTokenSchema);

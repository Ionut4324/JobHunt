
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderID: { type: String, required: true },
    receiverID: { type: String, required: true },
    content: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
},
    { timestamps: true }
);

const messageModel = new mongoose.model("messages", messageSchema);
module.exports = messageModel;
const express = require("express");
const router = express.Router();
const Message = require("../models/messageModel");
const User = require("../models/userModel");

router.post("/messages", async (req, res) => {
    const { senderID, receiverID } = req.body
    try {
        const messagesFromUs = await Message.find({
            senderID: senderID,
            receiverID: receiverID
        });
        const messagesFromThem = await Message.find({
            senderID: receiverID,
            receiverID: senderID
        });
        const allMessages = [...messagesFromUs, ...messagesFromThem]
        res.status(200).json(allMessages);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/message", async (req, res) => {
    const { senderID, receiverID, content, sentAt } = req.body;
    try {
        const newMessage = new Message({ senderID, receiverID, content, sentAt });
        await newMessage.save();
        res.status(200).json("Message Sent Successfully");
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.get("/username/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ _id: id });
        res.status(200).json({"username":user.username});
    } catch (error) {
        return res.status(400).json({ error });
    }
});


module.exports = router;
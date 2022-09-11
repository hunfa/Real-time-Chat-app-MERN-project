const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({


    chatName: { type: String, trim: true, default:"private" },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "user" },







}
    , { timestamps: true });

module.exports = mongoose.model("chat", chatSchema);
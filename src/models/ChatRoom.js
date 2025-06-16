const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const chatRoomSchema = new mongoose.Schema(
  {
    name: String, // group name
    isGroup: { type: Boolean, default: false },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    status: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

chatRoomSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;

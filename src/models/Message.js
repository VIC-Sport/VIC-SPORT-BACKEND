const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const messageSchema = new mongoose.Schema(
  {
    chatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: { type: String },
    type: {
      type: String,
      enum: ["text", "image", "video", "file"],
      default: "text"
    },
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

messageSchema.plugin(mongoose_delete, { overrideMethods: "all" });
module.exports = mongoose.model("Message", messageSchema);

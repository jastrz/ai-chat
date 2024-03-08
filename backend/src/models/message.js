import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: [
      {
        data: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["text", "image"],
          required: true,
        },
      },
    ],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
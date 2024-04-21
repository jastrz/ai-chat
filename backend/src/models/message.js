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
  prompt: {
    type: {
      status: String,
      type: String,
    },
  },
  responses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const Message = mongoose.model("Message", messageSchema);

export default Message;

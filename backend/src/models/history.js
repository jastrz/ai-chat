import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const History = mongoose.model("History", historySchema);
export default History;

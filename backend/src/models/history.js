import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const History = mongoose.model("History", historySchema);
export default History;

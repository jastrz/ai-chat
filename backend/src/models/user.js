import mongoose from "mongoose";

const UserGroup = {
  User: "user",
  Admin: "admin",
};

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  usergroup: { type: String, default: "user" },
  histories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "History",
    },
  ],
});

export const User = mongoose.model("User", userSchema);

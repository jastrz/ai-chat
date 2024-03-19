import mongoose from "mongoose";

const UserGroup = {
  User: "user",
  Admin: "admin",
};

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  usergroup: { type: String, default: UserGroup.User },
  histories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "History",
    },
  ],
});
const User = mongoose.model("User", userSchema);
export default User;

import mongoose from "mongoose";
import User from "./userModel.js";

const gameSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: "User" },
  players: [String],
});

const game = mongoose.model("Game", gameSchema);

gameSchema.path("user_id").validate(async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return false;
    return true;
  } catch (e) {
    return false;
  }
});

export default game;

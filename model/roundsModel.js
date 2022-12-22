import mongoose from "mongoose";
import Game from "./gameModel.js";

const roundsSchema = new mongoose.Schema({
  game_id: { type: mongoose.Types.ObjectId, ref: "Game" },
  scores: [
    {
      player: { type: String, required: true },
      score: { type: Number, required: true },
    },
  ],
});

const rounds = mongoose.model("Round", roundsSchema);

roundsSchema.path("game_id").validate(async (gameId) => {
  try {
    const game = await Game.findById(gameId);
    if (!game) return false;
    return true;
  } catch (e) {
    return false;
  }
});

export default rounds;

import mongoose from "mongoose";

const roundsSchema = new mongoose.Schema({
  game_id: { type: mongoose.Types.ObjectId, ref: "Game" },
  scores: [{ player: { type: String }, score: { type: Number } }],
});

const rounds = mongoose.model("Round", roundsSchema);
export default rounds;

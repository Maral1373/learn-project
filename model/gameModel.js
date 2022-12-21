import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  players: ["String"],
});

const game = mongoose.model("Game", gameSchema);
export default game;

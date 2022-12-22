import express from "express";
import {
  getGames,
  getGameById,
  postGame,
} from "../controller/gameController.js";

const router = express.Router();

router.route("/").get(getGames).post(postGame);
router.route("/:id").get(getGameById);

export default router;

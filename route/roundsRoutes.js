import express from "express";
import {
  getRounds,
  getRoundById,
  postRound,
} from "../controller/roundController.js";

const router = express.Router();

router.route("/").get(getRounds).post(postRound);
router.route("/:id").get(getRoundById);

export default router;

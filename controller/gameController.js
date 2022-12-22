import Game from "../model/gameModel.js";

export const getGames = async (req, res, next) => {
  try {
    const games = await Game.find({});
    res.json(games);
  } catch (error) {
    next(error);
  }
};

export const getGameById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const game = await Game.findById(id);
    res.json(game);
  } catch (error) {
    next(error);
  }
};

export const postGame = async (req, res, next) => {
  try {
    const game = await Game.create(req.body);
    res.json(game);
  } catch (error) {
    next(error);
  }
};

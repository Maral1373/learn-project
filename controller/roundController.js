import Round from "../model/roundsModel.js";

export const getRounds = async (req, res, next) => {
  try {
    const rounds = await Round.find({});
    res.json(rounds);
  } catch (error) {
    next(error);
  }
};

export const getRoundById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const round = await Round.findById(id);
    res.json(round);
  } catch (error) {
    next(error);
  }
};

export const postRound = async (req, res, next) => {
  try {
    const round = await Round.create(req.body);
    res.json(round);
  } catch (error) {
    next(error);
  }
};

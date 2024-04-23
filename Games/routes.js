import * as dao from "./dao.js";
export default function GameRoutes(app) {

  const createGame = async (req, res) => {
    const game = await dao.createGame(req.body);
    res.json(game);
  };

  const findAllGames = async (req, res) => {
    const games = await dao.findAllGames();
    res.json(games);
  };

  const findGameByGameName = async (req, res) => {
    const game = await dao.findGameByGameName(req.params.username);
    res.json(game);
  };

  app.post("/api/games", createGame);
  app.get("/api/allGames", findAllGames);
  app.get("/api/:game", findGameByGameName);
}

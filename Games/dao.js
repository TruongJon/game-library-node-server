import model from "./model.js";

export const createGame = async (game) => {
    const emptyGame = {
        origin: '',
        gameName: '',
        image_url: '',
    };
    await model.deleteOne({ gameName: game.gameName });
    return model.create({...emptyGame, ...game});
}

export const findAllGames = () => model.find();
export const findGameByGameName = (gameName) =>  model.findOne({ gameName: gameName });
